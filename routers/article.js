const path = require("path");
const moment = require("moment");
const multer = require("multer");
const express = require("express");
const db = require("../db");
const upload = multer({
  dest: path.join(__dirname, "../uploads"),
});
const router = express.Router();
//配置路由
// 添加文章
router.post("/add", upload.single("cover_img"), (req, res) => {
  let obj = req.body;
  obj.pub_date = moment().format("YYYY-MM-DD hh:mm:ss");
  obj.author_id = req.user.id;
  obj.cover_img = req.file.filename;
  db("insert into article set ?", obj, (err, result) => {
    if (result && result.affectedRows > 0) {
      res.json({
        status: 0,
        message: "添加文章成功",
      });
    } else {
      res.json({
        status: 1,
        message: "添加文章失败",
      });
    }
  });
});

// 获取文章列表数据
router.get("/list", (req, res) => {
  // 接收所有的请求参数
  // let pagenum = req.query.pagenum;
  // let pagesize = req.query.pagesize;
  // let cate_id = req.query.cate_id;
  // let state = req.query.state;
  // 使用解构的方式，获取请求参数
  let { pagenum, pagesize, cate_id, state } = req.query;
  // 判断必填参数是否存在
  if (!pagesize || !pagenum) {
    return res.json({
      status: 1,
      message: "缺少必要参数",
    });
  }

  // 生成where条件，完成筛选工作
  let w = "";
  if (cate_id) {
    w += " and cate_id=" + cate_id; // 注意前面有空格
  }
  if (state) {
    w += ` and state = '${state}'`; // 注意前面有空格
  }

  // 下面查询数据，把结果响应给客户端
  // 下面是SQL比较长，可以先在 Navicat中查询，没问题，复制过来
  let sql = `select a.Id, a.title, a.pub_date, a.state, c.name cate_name from article a
 join category c on a.cate_id=c.Id
 join user u on u.id=a.author_id
 where u.id = ? ${w}
 limit ${(pagenum - 1) * pagesize}, ${pagesize}`;

  db(sql, req.user.id, (err, r) => {
    if (r) {
      // 查询总记录数
      db(
        "select count(*) as total from article where author_id=?" + w,
        req.user.id,
        (err, r2) => {
          if (r2) {
            res.json({
              status: 0,
              message: "获取数据列表成功",
              data: r,
              total: r2[0].total,
            });
          } else {
            res.json({
              status: 1,
              message: "查询失败",
            });
          }
        }
      );
    } else {
      res.json({
        status: 1,
        message: "查询失败",
      });
    }
  });
});
//导出
module.exports = router;

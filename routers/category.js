const db = require("../db");
const express = require("express");
const router = express.Router();
//配置路由
//获取文章分类列表
router.get("/cates", (req, res) => {
  db("select * from category", null, (err, result) => {
    if (err) {
      res.json({
        status: 0,
        message: "获取文章分类列表失败！",
      });
    } else {
      res.json({
        status: 0,
        message: "获取文章分类列表成功！",
        data: result,
      });
    }
  });
});

//新增文章分类
router.post("/addcates", (req, res) => {
  db("insert into category set ?", req.body, (err, result) => {
    if (result.affectedRows > 0) {
      res.json({
        status: 0,
        message: "新增文章分类成功！",
      });
    } else {
      res.json({
        status: 1,
        message: "新增文章分类失败！",
      });
    }
  });
});

//根据 Id 删除文章分类
router.get("/deletecate/:id", (req, res) => {
  const id = req.params.id;
  db("delete from category where id=?", id, (err, result) => {
    if (err) {
      res.json({
        status: 1,
        message: "删除文章分类失败！",
      });
    } else {
      if (result.affectedRows > 0) {
        res.json({
          status: 0,
          message: "删除文章分类成功！",
        });
      }
    }
  });
});

//根据 Id 更新文章分类数据
router.post("/updatecate", (req, res) => {
  let obj = {
    name: req.body.name,
    alias: req.body.alias,
  };
  db("update  category set ? where id=?", [obj, req.body.Id], (err, result) => {
    if (err) {
      res.json({
        status: 1,
        message: "更新文章失败！",
      });
    } else {
      if (result.affectedRows > 0) {
        res.json({
          status: 0,
          message: "更新文章成功！",
        });
      }
    }
  });
});
//导出
module.exports = router;

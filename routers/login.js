const utility = require("utility");
const db = require("../db");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
//配置路由
//注册
router.post("/reguser", (req, res) => {
  req.body.password = utility.md5(req.body.password);
  // console.log(req.body);{ username: '123123', password: '123456' }
  db("insert into user set ?", req.body, (err, result) => {
    if (err) {
      res.json({
        status: 1,
        message: "注册失败！",
      });
    } else {
      res.json({
        status: 0,
        message: "注册成功！",
      });
    }
  });
});

//登录

router.post("/login", (req, res) => {
  db(
    "select * from user where username=? and password=?",
    [req.body.username, utility.md5(req.body.password)],
    (err, result) => {
      if (result.length > 0) {
        //console.log(result);
        res.json({
          status: 0,
          message: "登录成功！",
          token:
            "Bearer " +
            jwt.sign(
              { username: req.body.username, id: result[0].id },
              "bigevent-9760",
              {
                expiresIn: "48h",
              }
            ),
        });
      } else {
        res.json({
          status: 1,
          message: "登录失败！",
        });
      }
    }
  );
});
//导出
module.exports = router;

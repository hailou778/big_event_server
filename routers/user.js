const utility = require("utility");
const express = require("express");
const db = require("../db");
const router = express.Router();
//配置路由

//获取用户的基本信息
router.get("/userinfo", (req, res) => {
  db(
    "select * from user where username=?",
    req.user.username,

    (err, result) => {
      if (result.length > 0) {
        res.json({
          status: 0,
          message: "获取信息成功！",
          data: result[0],
        });
      } else {
        res.json({
          status: 1,
          message: "获取信息失败！",
        });
      }
    }
  );
});

//更新用户的基本信息
router.post("/userinfo", (req, res) => {
  console.log(req.body);
  db(
    "update user set nickname=?,email=? where id=?",
    [req.body.nickname, req.body.email, req.body.id],
    (err, result) => {
      // console.log(result);
      if (result.affectedRows > 0) {
        res.json({
          status: 0,
          message: "更新用户的基本信息成功！",
        });
      } else {
        res.json({
          status: 1,
          message: "更新用户的基本信息失败！",
        });
      }
    }
  );
});

//重置密码
router.post("/updatepwd", (req, res) => {
  if (req.body.oldPwd === req.body.newPwd) {
    res.json({
      status: 1,
      message: "重置密码失败 新密码和原密码不能相同！",
    });
    return;
  }
  db(
    "select * from user where id=? and password=?",
    [req.user.id, utility.md5(req.body.oldPwd)],
    (err, result) => {
      if (err) {
        res.json({
          status: 9,
          message: "重置密码失败 ！",
        });
      } else {
        if (result.length > 0) {
          db(
            "update user set password=? where id=?",
            [utility.md5(req.body.newPwd), req.user.id],
            (err, result) => {
              if (err) {
                res.json({
                  status: 2,
                  message: "重置密码失败 ！",
                });
              } else {
                if (result.affectedRows > 0) {
                  res.json({
                    status: 0,
                    message: "重置密码成功 ！",
                  });
                }
              }
            }
          );
        }
      }
    }
  );
});

//更换头像
router.post("/update/avatar", (req, res) => {
  db(
    "update user set user_pic=? where id =?",
    [req.body.avatar, req.user.id],
    (err, result) => {
      if (err) {
        res.json({
          status: 1,
          message: "更新头像失败！",
        });
      } else {
        if (result.affectedRows > 0) {
          res.json({
            status: 0,
            message: "更新头像成功！",
          });
        }
      }
    }
  );
});
//导出
module.exports = router;

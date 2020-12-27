const path = require("path");
const express = require("express");
const app = express();
app.listen(3007, () => console.log("大事件服务器启动了"));

//使用路由模块

app.use("/api", require(path.join(__dirname, "routers", "login")));
app.use("/my", require(path.join(__dirname, "routers", "user")));
app.use("/my/article", require(path.join(__dirname, "routers", "article")));
app.use("/my/article", require(path.join(__dirname, "routers", "category")));

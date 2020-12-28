const path = require("path");
const express = require("express");
const app = express();
app.listen(3007, () => console.log("大事件服务器启动了"));

const cors = require("cors");
const expressJWT = require("express-jwt");
// ----------  加载路由模块之前，设置应用级别的配置
// 解决跨域
app.use(cors());
// 接收 urlencoded 类型的请求体
app.use(express.urlencoded({ extended: false }));
// 开放静态资源（uploads）uploads 文件夹要放上传的图片
app.use(express.static("uploads"));
// 配置解密token和不需要验证token的路由
app.use(
  expressJWT({ secret: "bigevent-9760", algorithms: ["HS256"] }).unless({
    path: /^\/api/,
  })
);
//使用路由模块

app.use("/api", require(path.join(__dirname, "routers", "login")));
app.use("/my", require(path.join(__dirname, "routers", "user")));
app.use("/my/article", require(path.join(__dirname, "routers", "article")));
app.use("/my/article", require(path.join(__dirname, "routers", "category")));

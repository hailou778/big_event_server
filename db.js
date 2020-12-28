function db(sql, params, callback) {
  const mysql = require("mysql");
  const conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "big_event", // 填写数据库名
  });
  conn.connect();
  conn.query(sql, params, callback);
  conn.end();
}

//导出
module.exports = db;

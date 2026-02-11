const sql = require("mssql");

const config = {
  server: "NAND\\SQLEXPRESS01",   // 👈 EXACT instance
  database: "quizApp",
  options: {
    trustServerCertificate: true
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ SQL Server Connected Successfully");
    return pool;
  })
  .catch(err => {
    console.error("❌ DB Connection Failed:", err.message);
  });

module.exports = {
  sql,
  poolPromise
};

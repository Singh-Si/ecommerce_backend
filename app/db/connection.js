const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

try {
 (async ()=>{
  await sequelize.authenticate()
  console.log("Database connection has been established successfully.")

})()
} catch (error) {
  console.log("Error occured>>>>>>>>>>>>>>>>>.",error);
  
}

module.exports = sequelize

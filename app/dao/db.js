const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

initializeConnection = () => {
  /* create a connection object using createConnection function of mysql module*/
  var connection =  mysql.createConnection({
    host: dbConfig.HOST,
    user:dbConfig.USER,
    password:dbConfig.PASSWORD,
    database:dbConfig.DB
  });

  connection.connect(error => {
    if(error) throw error;

    console.log('successfully connected to the database')
  });
  
  return connection;
}


module.exports = initializeConnection;

const mysql = require('mysql');

function connect() {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root', // MySQL kullanıcı adınızı buraya girin
        password: '1234', // MySQL şifrenizi buraya girin
        database: 'nodejs', // Bağlanmak istediğiniz veritabanının adını buraya girin
        port: '3306'
      });
      
      conn.connect((err) => {
        if (err) {
          console.error('MySQL connection failed: ', err);
          return;
        }
        console.log('Connected to MySQL database');
      });
      return conn;
}



module.exports = connect;
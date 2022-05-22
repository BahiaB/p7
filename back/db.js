
    const mysql = require('mysql2');

    const db = mysql.createConnection({
        host     : "127.0.0.1",
        user     :  "root",
        port: '3306',
        password : "B558b387B558",  
        database: "Groupomania"
        
    }
    );
    //console.log(db);
    
    db.connect((err) => {
        
        if (err) {
            console.log(err);
            return console.error('error connecting: ' + err.stack);
        }
        console.log('Mysql connected');  
    });
    
    module.exports.getDB = () => {
        return db
    }
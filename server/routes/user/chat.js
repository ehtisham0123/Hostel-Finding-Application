var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const MySQLEvents = require('@rodrigogs/mysql-events');
const Pusher = require("pusher");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel_management_system",
});

// connect to database
db.connect();

const pusher = new Pusher({
  appId: "1213321",
  key: "ea25a3949b7662bf5669",
  secret: "4ba7f89ef3734b4eea50",
  cluster: "ap2",
  useTLS: true
});

/* GET wardens listing. */
router.get("/messages/:id", verifyToken, async function (req, res, next) {
    var sql = `SELECT * FROM messages WHERE user_id = ? AND warden_id = ?;`;
    await db.query(sql,[ req.user_id,req.params.id], function (err, messages) {
      if (err) throw err;
      res.status(201).json({ messages: messages });
    });

 });



/* GET wardens listing. */
router.get("/warden/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT wardens.id,wardens.name,wardens.firstname,wardens.lastname,wardens.avatar FROM wardens WHERE wardens.id = ?`;
    await db.query(sql,[req.params.id], function (err, result) {
            res.status(201).json({ result: result});      
      });
  }
   catch (er) {
  console.log(err);
  }

});



/* GET wardens listing. */
router.get("/avatar/", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT users.avatar,users.name FROM users WHERE users.id = ?`;
    await db.query(sql,[req.user_id], function (err, result) {
            res.status(201).json({ result: result});      

      });
  }
   catch (er) {
  console.log(err);
  }

});






/* GET wardens listing. */
router.get("/:name?", verifyToken, async function (req, res, next) {
  if (req.params.name) {
    var sql = `SELECT wardens.id,wardens.name,wardens.firstname,wardens.lastname,wardens.avatar FROM wardens WHERE (CONCAT(wardens.firstname, ' ', wardens.lastname) LIKE ?) AND wardens.id IN (SELECT chat.warden_id FROM chat WHERE user_id = ?);`;
    name = "%" + req.params.name + "%";
    await db.query(sql, [name,req.user_id], function (err, result) {
      res.status(201).json({ result: result });
    });
  } else {
    var sql = `SELECT wardens.id,wardens.name,wardens.firstname,wardens.lastname,wardens.avatar FROM wardens WHERE wardens.id IN (SELECT chat.warden_id FROM chat WHERE user_id = ?);`;
    await db.query(sql,[req.user_id], function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
  }
});

router.post('/messages/new',verifyToken, async function(req, res, next) {

  let { message,warden_id } = req.body;

   var sql = `SELECT * FROM chat WHERE user_id = ? AND warden_id = ?;`;
    await db.query(sql,[ req.user_id,warden_id], function (err, result) {
     if(!result.length > 0){
        sql = "INSERT INTO `chat` (`user_id`,`warden_id`) VALUES (?)";
        var values = [req.user_id,warden_id];
       return db.query(sql,[values], function (err, result) {
          if (err) throw err; 
            sql = "INSERT INTO `messages` (`user_id`, `warden_id`, `message`,status) VALUES (?)";
            var values = [req.user_id,warden_id,message,true];
            return db.query(sql,[values], function (err, result) {
                if (err) throw err; 
                 var sql = 'SELECT * FROM messages WHERE id = ?';
                   return  db.query(sql,result.insertId, function (err, result) {
                      pusher.trigger("messages", "inserted", 
                      {    
                         user_id:result[0].user_id,
                         warden_id:result[0].warden_id,
                         message:result[0].message,
                         created_at:result[0].created_at,
                         status:result[0].status,     
                      });
                  });                    
            }); 


            }
            ); 
      }
      else{
            sql = "INSERT INTO `messages` (`user_id`, `warden_id`, `message`,status) VALUES (?)";
            var values = [req.user_id,warden_id,message,true];
             db.query(sql,[values], function (err, result) {
                if (err) throw err; 
              
                var sql = 'SELECT * FROM messages WHERE id = ?';
                     db.query(sql,result.insertId, function (err, result) {
                      pusher.trigger("messages", "inserted", 
                      {    
                         user_id:result[0].user_id,
                         warden_id:result[0].warden_id,
                         message:result[0].message,
                         created_at:result[0].created_at,
                         status:result[0].status,     
                      });
                  });



                res.status(201).json('message saved'); 

            }); 
      }

    });


});



module.exports = router;

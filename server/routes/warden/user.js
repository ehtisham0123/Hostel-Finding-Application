var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel_management_system",
});

// connect to database
db.connect();


/* GET users listing. */
router.get("/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT users.* FROM users WHERE users.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      (async () => {
        try{
          sql = `
          SELECT rooms.*
          FROM rooms
          WHERE rooms.id IN
          (SELECT booking.room_id
          FROM booking
          WHERE
          user_id = ?)
          `;
             await db.query(sql, [req.params.id], function (err, rooms) {         
               res.status(201).json({ result: result , rooms : rooms });
              });
        }catch (er) {
            console.log(err);
        }
        })();

      });
      } catch (er) {
      console.log(err);
    }

});


module.exports = router;

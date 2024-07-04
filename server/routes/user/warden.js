var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const fileUpload = require("express-fileupload");
const fs = require("fs");
router.use(fileUpload());

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel_management_system",
});

// connect to database
db.connect();


/* GET wardens listing. */
router.get("/:id", verifyToken, async function (req, res, next) {
  try {
    var sql = `SELECT wardens.* FROM wardens WHERE wardens.id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      (async () => {
        try{
          sql = `SELECT rooms.id,rooms.name
          FROM rooms 
          INNER JOIN wardens ON rooms.warden_id=wardens.id
          WHERE
          wardens.id = ?
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

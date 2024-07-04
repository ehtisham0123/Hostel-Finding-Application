let express = require("express");
let router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require('../verifyToken');
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
/* GET rooms listing. */


router.get("/booked-rooms/:id",verifyToken,async (req, res, next) => {
   
  try{
    sql = `SELECT users.id,users.firstname, users.lastname,users.email,users.avatar
      FROM users
      WHERE users.id IN
      (SELECT booking.user_id
      FROM booking
      WHERE
      room_id = ?) 
  `;
      db.query(sql, [req.params.id], function (err, result) {           
          res.status(201).json({ result:result});
      });
    }catch (er) {
      console.log(err);
    }
}); 


router.get("/:name?",verifyToken, async (req, res, next) => {
  let category = req.query.category;
  if (req.params.name) {
    if (category == 'All') {
      let sql = `SELECT rooms.*,wardens.name as warden_name
      FROM rooms
      INNER JOIN wardens ON rooms.warden_id=wardens.id 
      WHERE rooms.name LIKE ?`;
      name = "%" + req.params.name + "%";
      await db.query(sql, [name], function (err, result) {
        res.status(201).json({ result: result });
      });
    }else{
      let sql = `SELECT rooms.*,wardens.name as warden_name
      FROM rooms
      INNER JOIN wardens ON rooms.warden_id=wardens.id 
      WHERE rooms.name LIKE ? AND rooms.category = ? `;
      name = "%" + req.params.name + "%";
      await db.query(sql, [name,category], function (err, result) {
        res.status(201).json({ result: result });
      });
    }
  } 
  else {
    if (category == 'All') {

    let sql = `SELECT rooms.*,wardens.name as warden_name
    FROM rooms
    INNER JOIN wardens ON rooms.warden_id=wardens.id
    WHERE 1
    `;
    await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
  }else{

    let sql = `SELECT rooms.*,wardens.name as warden_name
    FROM rooms
    INNER JOIN wardens ON rooms.warden_id=wardens.id
    WHERE 1 AND rooms.category = ?
    `;
    await db.query(sql,[category], function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    }); 
  }

  }
});


/* GET single room */
router.get("/show/:id",verifyToken, async function (req, res, next) {
    try{
      let sql = `SELECT rooms.*,
      wardens.id as warden_id,
      wardens.firstname as warden_firstname,
      wardens.lastname as warden_lastname,
      wardens.country as warden_country,
      wardens.city as warden_city,
      wardens.avatar as warden_photo
      FROM rooms 
      INNER JOIN wardens ON rooms.warden_id=wardens.id
      WHERE
      rooms.id = ?
      `;
      await db.query(sql, [req.params.id], function (err, result) {
      try{
      sql = `SELECT reviews.*,
      users.firstname as user_firstname,
      users.lastname as user_lastname,
      users.avatar as user_photo
      FROM reviews 
      INNER JOIN users ON reviews.user_id=users.id
      WHERE
      reviews.room_id = ?
      `;
          db.query(sql, [req.params.id], function (err, reviews) {

                try{
                sql = `SELECT users.id,users.name,users.avatar
                  FROM users
                  WHERE users.id IN
                  (SELECT booking.user_id
                  FROM booking
                  WHERE
                  room_id = ?)
              `;
                  db.query(sql, [req.params.id], function (err, bookings) {           
                      res.status(201).json({ result: result , reviews : reviews ,bookings:bookings});
                  });
                }catch (er) {
                  console.log(err);
                }
          });
        }catch (er) {
          console.log(err);
        }
      }); 
    }catch (er) {
      console.log(err);
    }
});


/* GET single room */
router.get("/edit/:id",verifyToken, async function (req, res, next) {
    let sql = `SELECT rooms.* FROM rooms
    WHERE
    rooms.id = ?
    `;
    await db.query(sql, [req.params.id], function (err, result) {
      res.status(201).json({ result: result });
    });
});


router.delete("/:id",verifyToken, async function (req, res, next) {
    let sql = `DELETE FROM rooms WHERE id = ?`;
    await db.query(sql, [req.params.id], function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
});

router.delete("/booking/room/:room_id/user/:user_id",verifyToken, async function (req, res, next) {
  let sql = `DELETE FROM booking WHERE room_id = ? AND user_id = ?`;
  await db.query(sql, [req.params.room_id, req.params.user_id], function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});




router.put("/update/", verifyToken, async (req, res, next) => {
let id = req.body.id,
  name = req.body.name,
  room_number = req.body.room_number,
  account_name = req.body.account_name,
  account_number = req.body.account_number,
  per_month_rent = req.body.per_month_rent,
  category = req.body.category,
  details = req.body.details,
  warden_id = req.body.warden_id,
  thumbnail = req.body.thumbnail;
  let photo;
  if (req.files === null) {
          photo = thumbnail;
        } else {
          file = req.files.file;
          fs.unlinkSync(
            `${__dirname}/../../public/uploads/${req.body.thumbnail}`
          );
          thumbnail = req.files.file;
          photo = thumbnail.name.split(".");
          photo = photo[0] + "." + Date.now() + "." + photo[photo.length - 1];
          (async () => {
            thumbnail.mv(
              `${__dirname}/../../public/uploads/${photo}`,
              (err) => {
                if (err) {
                  console.error(err);
                }
              }
            );
          })();
        }
    sql =
     `
      UPDATE rooms
      SET name = ?, 
      room_number = ?, 
      account_name = ?, 
      account_number = ?, 
      per_month_rent = ?, 
      thumbnail = ?, 
      category = ?, 
      details = ?,
      warden_id = ?
      WHERE id = ? 
      `;
      await db.query(sql, [name,room_number,account_name,account_number,per_month_rent,photo,category, details, warden_id, id], function (err, result) {
        if (err) throw err;
        res.status(201).json({ thumbnail:photo,'success': 'Room updated' });
      })
})

 
module.exports = router;
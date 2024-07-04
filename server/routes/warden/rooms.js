var express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const fs = require("fs");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel_management_system",
});

// connect to database
db.connect();



router.get("/booked-rooms/:id", verifyToken, async (req, res, next) => {
  try {
    sql = `SELECT users.id,users.firstname, users.lastname,users.email,users.avatar
      FROM users
      WHERE users.id IN
      (SELECT booking.user_id
      FROM booking
      WHERE
      room_id = ?) 
  `;
    db.query(sql, [req.params.id], function (err, result) {
      res.status(201).json({ result: result });
    });
  } catch (er) {
    console.log(err);
  }
});

/* GET rooms listing. */
router.get("/:name?", verifyToken, async (req, res, next) => {
  let category = req.query.category;  
  if (req.params.name) {
    if (category == 'All') {
      let sql = `SELECT rooms.*
      FROM rooms
      WHERE rooms.name LIKE ? AND rooms.warden_id = ?`;
      name = "%" + req.params.name + "%";
      await db.query(sql, [name, req.user_id], function (err, result) {
        res.status(201).json({ result: result });
      });
    }else{
      let sql = `SELECT rooms.*
      FROM rooms
      WHERE rooms.name LIKE ? AND rooms.warden_id = ? AND rooms.category = ?`;
      name = "%" + req.params.name + "%";
      await db.query(sql, [name, req.user_id,category], function (err, result) {
        res.status(201).json({ result: result });
      });
      
    }
  }
  else {
    if (category == 'All') {
      let sql = `SELECT rooms.*
      FROM rooms
      WHERE rooms.warden_id = ?
      `;
      await db.query(sql, [req.user_id], function (err, result) {
        if (err) throw err;
        res.status(201).json({ result: result });
      });
    }else{
      let sql = `SELECT rooms.*
      FROM rooms
      WHERE rooms.warden_id = ? AND rooms.category = ?
      `;
      await db.query(sql, [req.user_id,category], function (err, result) {
        if (err) throw err;
        res.status(201).json({ result: result });
      });
    }
  }
});


router.post("/create", verifyToken, async (req, res, next) => {
  let name = req.body.name;
  let room_number = req.body.room_number;
  let account_name = req.body.account_name;
  let account_number = req.body.account_number;
  let per_month_rent = req.body.per_month_rent;
  let category = req.body.category;
  let details = req.body.details;
  let photo;
  const thumbnail = req.files.thumbnail;
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
  sql =
    "INSERT INTO `rooms` (name,room_number,per_month_rent,category, details,account_name,account_number,warden_id,thumbnail) VALUES (?)";
  let values = [name,room_number, per_month_rent, category, details,account_name,account_number, req.user_id, photo];
  await db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err)
      res.status(201).json({ 'error': 'Error while inseting data' });
    }
    else {
      res.status(201).json({ 'success': 'Room Added' });
    }
  })
});



router.post("/unhide/:id?", async (req, res, next) => {
  let id = req.params.id;
    sql =
     `UPDATE rooms
      SET 
      hidden = ? 
      WHERE id = ? 
      `;
      await db.query(sql, ['False',id], function (err, result) {
        if (err) throw err;
        res.status(201).json({'success': 'Room updated' });
      })
})


router.post("/hide/:id?", async (req, res, next) => {
  let id = req.params.id;
    sql =
     `UPDATE rooms
      SET 
      hidden = ? 
      WHERE id = ? 
      `;
      await db.query(sql, ['True',id], function (err, result) {
        if (err) throw err;
        res.status(201).json({'success': 'Room updated' });
      })
})


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


/* GET single room */
router.get("/show/:id", verifyToken, async function (req, res, next) {
  try {
    let sql = `SELECT rooms.*
      FROM rooms 
      INNER JOIN wardens ON rooms.warden_id=wardens.id
      WHERE
      rooms.id = ?
      `;
    await db.query(sql, [req.params.id], function (err, result) {
      try {
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
          res.status(201).json({ result: result, reviews: reviews });
        });
      } catch (er) {
        console.log(err);
      }
    });
  } catch (er) {
    console.log(err);
  }
});


/* GET single room */
router.get("/edit/:id", verifyToken, async function (req, res, next) {
  let sql = `SELECT rooms.* FROM rooms
    WHERE
    rooms.id = ?
    `;
  await db.query(sql, [req.params.id], function (err, result) {
    res.status(201).json({ result: result });
  });
});


router.delete("/:id", verifyToken, async function (req, res, next) {
  let sql = `DELETE FROM rooms WHERE id = ?`;
  await db.query(sql, [req.params.id], function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});


router.delete("/booking/room/:room_id/user/:user_id", verifyToken, async function (req, res, next) {
  let sql = `DELETE FROM booking WHERE room_id = ? AND user_id = ?`;
  await db.query(sql, [req.params.room_id, req.params.user_id], function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});



// router.delete("/booking/:id", verifyToken, async function (req, res, next) {
//   let sql = `DELETE FROM booking WHERE room_id = ? AND warden_id = ?`;
//   await db.query(sql, [req.params.id, req.user_id], function (err, result) {
//     if (err) throw err;
//     res.status(201).json({ result: result });
//   });
// });





module.exports = router;
let express = require("express");
let router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
let temp = {};

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel_management_system",
});

router.get("/booked/:name?", verifyToken, async function (req, res, next) {
  try {
    if (req.params.name) {
    let sql = `
    SELECT rooms.*
    FROM rooms
    WHERE rooms.name LIKE ? AND rooms.id IN (SELECT booking.room_id 
    FROM booking WHERE user_id = ?)`;
      name = "%" + req.params.name + "%";
      await db.query(sql, [name, req.user_id], function (err, rooms) {
        res.status(201).json({ rooms: rooms });
      });
    } else {
      sql = `
    SELECT rooms.*
    FROM rooms
    WHERE rooms.id IN
    (SELECT booking.room_id
    FROM booking
    WHERE
    user_id = ?);
    `;
      await db.query(sql, [req.user_id], function (err, rooms) {
        res.status(201).json({ rooms: rooms });
      });
    }
  } catch (er) {
    console.log(err);
  }
});

// connect to database
db.connect();
/* GET rooms listing. */
router.get("/:name?", verifyToken, (req, res, next) => {
  let category = req.query.category;
  const getUser = async () => {
    var sql = `SELECT users.latitude as user_latitude,users.longitude as user_longitude FROM users WHERE users.id = ?`;
     db.query(sql, [req.user_id], function (err, user) {
      user = user[0];
      if (req.params.name) {
        if (category == 'All') {
        let sql = `SELECT rooms.*,wardens.name as warden_name
          FROM rooms
          INNER JOIN wardens ON rooms.warden_id=wardens.id 
          WHERE rooms.name LIKE ? AND rooms.hidden=?`;
        name = "%" + req.params.name + "%";
        db.query(sql,[name,"True"], (err, rooms) => {
          if (err) throw err;
  
              for(let i=1; i<rooms.length; i++)
              {
                for(let j=0; j<rooms.length-i; j++) 
                {    
                  var radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  var radlat2 = Math.PI * parseFloat(rooms[j].latitude)/180;
                  var theta = parseFloat(user.user_longitude)-parseFloat(rooms[j].longitude);
                  var radtheta = Math.PI * theta/180;
                  var dist1 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist1 > 1) {
                    dist1 = 1;
                  }
                  dist1 = Math.acos(dist1);
                  dist1 = dist1 * 180/Math.PI;
                  dist1 = dist1 * 60 * 1.1515;
                  dist1 = dist1 * 1.609344      
                  radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  radlat2 = Math.PI * parseFloat(rooms[j+1].latitude)/180;
                  theta = parseFloat(user.user_longitude)-parseFloat(rooms[j+1].longitude);
                  radtheta = Math.PI * theta/180;
                  var dist2 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist2 > 1) {
                    dist2 = 1;
                  }
                  dist2 = Math.acos(dist2);
                  dist2 = dist2 * 180/Math.PI;
                  dist2 = dist2 * 60 * 1.1515;
                  dist2 = dist2 * 1.609344     
                  if((dist2)<(dist1))
                  {
                    temp=rooms[j];
                    rooms[j]=rooms[j+1];
                    rooms[j+1]=temp;
                  }   
                }
              }
          res.status(201).json({ result: rooms });
        });
      }else{
         let sql = `SELECT rooms.*,wardens.name as warden_name
          FROM rooms
          INNER JOIN wardens ON rooms.warden_id=wardens.id 
          WHERE rooms.name LIKE ? AND rooms.category = ? AND rooms.hidden=?`;
        name = "%" + req.params.name + "%";
        db.query(sql,[name,category], (err, rooms) => {
          if (err) throw err;
  
              for(let i=1; i<rooms.length; i++)
              {
                for(let j=0; j<rooms.length-i; j++) 
                {    
                  var radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  var radlat2 = Math.PI * parseFloat(rooms[j].latitude)/180;
                  var theta = parseFloat(user.user_longitude)-parseFloat(rooms[j].longitude);
                  var radtheta = Math.PI * theta/180;
                  var dist1 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist1 > 1) {
                    dist1 = 1;
                  }
                  dist1 = Math.acos(dist1);
                  dist1 = dist1 * 180/Math.PI;
                  dist1 = dist1 * 60 * 1.1515;
                  dist1 = dist1 * 1.609344      
                  radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  radlat2 = Math.PI * parseFloat(rooms[j+1].latitude)/180;
                  theta = parseFloat(user.user_longitude)-parseFloat(rooms[j+1].longitude);
                  radtheta = Math.PI * theta/180;
                  var dist2 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist2 > 1) {
                    dist2 = 1;
                  }
                  dist2 = Math.acos(dist2);
                  dist2 = dist2 * 180/Math.PI;
                  dist2 = dist2 * 60 * 1.1515;
                  dist2 = dist2 * 1.609344     
                  if((dist2)<(dist1))
                  {
                    temp=rooms[j];
                    rooms[j]=rooms[j+1];
                    rooms[j+1]=temp;
                  }   
                }
              }
          res.status(201).json({ result: rooms });
        });

      }
      } else {
        if (category != 'All') {
        let sql = `SELECT rooms.*,wardens.name  as warden_name,wardens.latitude,wardens.longitude
          FROM rooms
          INNER JOIN wardens ON rooms.warden_id=wardens.id
          WHERE rooms.category = ?  AND rooms.hidden=?
          `;
          db.query(sql,[category,"False"], (err, rooms) => {
          if (err) throw err;
  
              for(let i=1; i<rooms.length; i++)
              {
                for(let j=0; j<rooms.length-i; j++) 
                {    
                  var radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  var radlat2 = Math.PI * parseFloat(rooms[j].latitude)/180;
                  var theta = parseFloat(user.user_longitude)-parseFloat(rooms[j].longitude);
                  var radtheta = Math.PI * theta/180;
                  var dist1 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist1 > 1) {
                    dist1 = 1;
                  }
                  dist1 = Math.acos(dist1);
                  dist1 = dist1 * 180/Math.PI;
                  dist1 = dist1 * 60 * 1.1515;
                  dist1 = dist1 * 1.609344      
                  radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  radlat2 = Math.PI * parseFloat(rooms[j+1].latitude)/180;
                  theta = parseFloat(user.user_longitude)-parseFloat(rooms[j+1].longitude);
                  radtheta = Math.PI * theta/180;
                  var dist2 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist2 > 1) {
                    dist2 = 1;
                  }
                  dist2 = Math.acos(dist2);
                  dist2 = dist2 * 180/Math.PI;
                  dist2 = dist2 * 60 * 1.1515;
                  dist2 = dist2 * 1.609344     
                  if((dist2)<(dist1))
                  {
                    temp=rooms[j];
                    rooms[j]=rooms[j+1];
                    rooms[j+1]=temp;
                  }   
                }
              }
          res.status(201).json({ result: rooms });
        });
     
        }else{

        let sql = `SELECT rooms.*,wardens.name  as warden_name,wardens.latitude,wardens.longitude
          FROM rooms
          INNER JOIN wardens ON rooms.warden_id=wardens.id
          WHERE rooms.hidden=? 
          `;
          db.query(sql,["False"], (err, rooms) => {
          if (err) throw err;
  
              for(let i=1; i<rooms.length; i++)
              {
                for(let j=0; j<rooms.length-i; j++) 
                {    
                  var radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  var radlat2 = Math.PI * parseFloat(rooms[j].latitude)/180;
                  var theta = parseFloat(user.user_longitude)-parseFloat(rooms[j].longitude);
                  var radtheta = Math.PI * theta/180;
                  var dist1 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist1 > 1) {
                    dist1 = 1;
                  }
                  dist1 = Math.acos(dist1);
                  dist1 = dist1 * 180/Math.PI;
                  dist1 = dist1 * 60 * 1.1515;
                  dist1 = dist1 * 1.609344      
                  radlat1 = Math.PI * parseFloat(user.user_latitude)/180;
                  radlat2 = Math.PI * parseFloat(rooms[j+1].latitude)/180;
                  theta = parseFloat(user.user_longitude)-parseFloat(rooms[j+1].longitude);
                  radtheta = Math.PI * theta/180;
                  var dist2 = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                  if (dist2 > 1) {
                    dist2 = 1;
                  }
                  dist2 = Math.acos(dist2);
                  dist2 = dist2 * 180/Math.PI;
                  dist2 = dist2 * 60 * 1.1515;
                  dist2 = dist2 * 1.609344     
                  if((dist2)<(dist1))
                  {
                    temp=rooms[j];
                    rooms[j]=rooms[j+1];
                    rooms[j+1]=temp;
                  }   
                }
              }
          res.status(201).json({ result: rooms });
        });
     





        }







      }





    });
  };
  getUser();
});

/* GET single room */
router.get("/show/:id", verifyToken, async (req, res, next) => {
  try {
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
    await db.query(sql, [req.params.id], (err, result) => {
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
        db.query(sql, [req.params.id], (err, reviews) => {
          try {
            sql = `SELECT booking.*
              FROM booking
              WHERE
              user_id = ? AND room_id = ?;
              `;
            db.query(
              sql,
              [req.user_id, req.params.id],
              function (err, booking) {
                if (booking.length > 0) {
                  res.status(201).json({
                    result: result,
                    reviews: reviews,
                    booking_id: booking[0].id,
                  });
                } else {
                  res.status(201).json({
                    result: result,
                    reviews: reviews,
                    booking_id: 0,
                  });
                }
              }
            );
          } catch (er) {
            console.log(err);
          }
        });
      } catch (er) {
        console.log(err);
      }
    });
  } catch (er) {
    console.log(err);
  }
});

router.delete("/booking/:id", verifyToken, async (req, res, next) => {
  let sql = `DELETE FROM booking WHERE room_id = ? AND user_id = ?`;
  await db.query(sql, [req.params.id, req.user_id], (err, result) => {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});

router.delete("/reviews/:id", verifyToken, async function (req, res, next) {
  let sql = `DELETE FROM reviews WHERE id = ? AND user_id`;
  await db.query(sql, [req.params.id, req.user_id], function (err, result) {
    if (err) throw err;
    res.status(201).json({ result: result });
  });
});

router.post("/book", verifyToken, async function (req, res, next) {
  const room_id = req.body.room_id;
  const warden_id = req.body.warden_id;
  const user_id = req.user_id;
  sql =
    "INSERT INTO `booking` (user_id, room_id,warden_id) VALUES (?)";
  let values = [user_id, room_id, warden_id];
  await db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.status(201).json({ booking_id: result.insertId });
    }
  });
});

router.post("/review", verifyToken, async function (req, res, next) {
  const user_id = req.user_id;
  const room_id = req.body.room_id;
  const warden_id = req.body.warden_id;
  const enorllment_id = req.body.enorllment_id;
  const reviews = req.body.reviews;
  const reviews_details = req.body.reviews_details;

  sql =
    "INSERT INTO `reviews` (user_id, room_id,warden_id,booking_id,reviews,reviews_details) VALUES (?)";
  let values = [
    user_id,
    room_id,
    warden_id,
    enorllment_id,
    reviews,
    reviews_details,
  ];
  await db.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err);
      res.status(201).json({ error: "Error while inseting data" });
    } else {
      res.status(201).json({ success: "Review Added" });
    }
  });
});

/* GET users listing. */

module.exports = router;

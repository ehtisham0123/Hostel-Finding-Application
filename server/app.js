var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mysql = require("mysql");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hostel_management_system",
});

// connect to database
db.connect();


var adminRouter = require('./routes/admin/admin');
var usersAdminRouter = require('./routes/admin/users');
var wardensAdminRouter = require('./routes/admin/wardens');
var roomsAdminRouter = require('./routes/admin/rooms');

var wardenRouter = require('./routes/warden/warden');
var roomsWardenRouter = require('./routes/warden/rooms');
var userWardenRouter = require('./routes/warden/user');
var chatWardenRouter = require('./routes/warden/chat');

var userRouter = require('./routes/user/user');
var roomsUserRouter = require('./routes/user/rooms');
var wardenUserRouter = require('./routes/user/warden');
var chatUserRouter = require('./routes/user/chat');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
   var sql = `select 
    (select count(*) from users) as users,
    (select count(*) from wardens) as wardens,
    (select count(*) from rooms) as rooms`;  
      await db.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({ result: result });
    });
});

app.use('/admin', adminRouter);
app.use('/admin/users', usersAdminRouter);
app.use('/admin/wardens', wardensAdminRouter);
app.use('/admin/rooms', roomsAdminRouter);

app.use('/warden', wardenRouter);
app.use('/warden/rooms', roomsWardenRouter);
app.use('/warden/users/profile/', userWardenRouter);
app.use('/warden/chat/', chatWardenRouter);


app.use('/user', userRouter);
app.use('/user/rooms', roomsUserRouter);
app.use('/user/wardens/profile/', wardenUserRouter);
app.use('/user/chat/', chatUserRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

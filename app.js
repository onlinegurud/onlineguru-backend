const express = require("express");
const { createInitialTable } = require("./controllers/createInitialTable");
const app = express();
const { db } = require("./database/config");
const registerRouter = require("./routers/authentication");
const teacherRouter = require("./routers/teacher");
const studentRouter = require("./routers/student");
const adminRouter = require("./routers/admin");
const ratingRouter = require("./routers/rating");
const balanceRouter = require("./routers/balance");
const { refreshValues } = require("./controllers/getPriceAndProperty");
app.use(express.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","*");
  next();
});



app.listen( process.env.PORT || 3001, () => {
  db.connect(function (err) {
    if (err) {
      return console.error("[-] error: " + err.message);
    }
    console.log("[+] Connected to the MySQL server.");
    createInitialTable();
    app.use("/rating", ratingRouter);
    app.use("/authentication", registerRouter);
    app.use("/teacher", teacherRouter);
    app.use("/student", studentRouter);
    app.use("/admin", adminRouter);
    app.use("/balance", balanceRouter);
  });
  console.log("[+] Server listening");
});



const check_alive=()=>{

  db.ping((err) => {
    if(err) console.log("MySQL Server is Down");
      
    console.log("MySQL Server is Active");
  })
  
  setTimeout(check_alive, 900000);
}

check_alive();

/////Todo: allowing after checking status
/////TODO: update each profile
/////todo:retrieving class
/////todo: mailling
/////todo:normal class room

//* class status
// 0-requested
// 1-accepted
// 2-rejected
// 3-completed

//*gender
//1-male
//0-female
//2-not prefered

//* position
// 1-teacher
// 0-student
// 2-admin
//3-superadmin

//*board
// 1-"CBSE"
// 2-icse
// 3-igcse
// 4-ib
//changed login , register ,createinitialtable insert Table for super admimn and admin
//created createAdmin and added admin table

//added verify is admin and superadmin

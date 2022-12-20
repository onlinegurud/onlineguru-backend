//const { verifyToken } = require("../controllers/middleware/verifyToken");
const { FetchBalanceDetails } = require("../controllers/fetchbalance");
const { AddBalance } = require("../controllers/addBalance");
const { UpdateBalance } = require("../controllers/updatebalance");
const { getBalanceById }  = require("../controllers/getBalanceById");


const { FetchTeacherBalanceDetails } = require("../controllers/fetchTeacherBalance");
const { AddTeacherBalance } = require("../controllers/addBalanceTeacher");
const { UpdateTeacherBalance } = require("../controllers/updateteacherbalance");
const { getTeacherBalanceById }  = require("../controllers/getTeacherBalanceById");



const router = require("express").Router();

router.post("/fetch/balance",FetchBalanceDetails);   
router.post("/add/balance",AddBalance);  
router.post("/update/balance",UpdateBalance);  
router.post("/fetch/getbyid/balance",getBalanceById);  


router.post("/fetch/teacher/balance",FetchTeacherBalanceDetails);   
router.post("/add/teacher/balance",AddTeacherBalance);  
router.post("/update/teacher/balance",UpdateTeacherBalance);  
router.post("/fetch/getbyid/teacher/balance",getTeacherBalanceById);  


module.exports = router;

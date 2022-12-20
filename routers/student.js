const { createClassroom } = require("../controllers/createClassroom");
const { fetchClassroom } = require("../controllers/fetchClassrooms");
const { fetchClasses } = require("../controllers/fetchingclasses");
const { getCredit } = require("../controllers/fetchPrices");
const { FetchProperties } = require("../controllers/fetchProperties");
const { GetStudentDetails } = require("../controllers/getStudentDetails");
const { verifyToken } = require("../controllers/middleware/verifyToken");
const { requestClass } = require("../controllers/requestclass");
const { UpdateStudent } = require("../controllers/updateStudent");
const {fetchClassOfClassroom}=require("../controllers/fetchingclassofclassroom");
const { GetStudentDetails2 } = require("../controllers/getStudentDetails2");
const { AddRating } = require("../controllers/addRatings");



const router = require("express").Router();

router.post("/requestclass", verifyToken, requestClass);   
router.post("/createclassroom", verifyToken, createClassroom);
router.post("/classrooms", verifyToken, fetchClassroom);
router.post("/classes", verifyToken, fetchClasses);
router.post("/update/info", verifyToken, UpdateStudent);
router.post("/info", verifyToken, GetStudentDetails);

router.post("/classroom/classes", verifyToken, fetchClassOfClassroom);
router.post("/info/getbyid", verifyToken, GetStudentDetails2);
router.post("/submit/rating", verifyToken, AddRating);


router.post("/info/price", verifyToken, getCredit);
router.post("/info/property", verifyToken, FetchProperties);

module.exports = router;

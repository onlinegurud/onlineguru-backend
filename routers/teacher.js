const { classResponse } = require("../controllers/acceptedclass");
const {
  classCompleteResponse,
} = require("../controllers/classCompletedResponse");
const { GetTeacherDetails } = require("../controllers/getTeacherDetails");
const { verifyToken } = require("../controllers/middleware/verifyToken");
const { requestTeacher } = require("../controllers/requestTeacher");
const { UpdateTeacher } = require("../controllers/updateTeacher");
const { fetchClassesteacher } = require("../controllers/fetchingclassesteacher");
const { fetchClassroomteacher } = require("../controllers/fetchclassroomteacher");
const { GetTeacherDetails2 } = require("../controllers/getTeacherDeatils2");
const { GetTeacherDetails3 } = require("../controllers/getTeacherDetails3");
const { UpdateClass} = require("../controllers/updateclasslink");
const { fetchRatings } = require("../controllers/fetchrating");




const router = require("express").Router();

router.post("/getteacherbyfilter", verifyToken, requestTeacher);
router.post("/update/info", verifyToken, UpdateTeacher);
router.post("/info", verifyToken, GetTeacherDetails);
router.post("/info/all", verifyToken, GetTeacherDetails2);
router.post("/class/response", classResponse);
router.post("/class/complete/response", classCompleteResponse);
router.post("/classes", verifyToken,fetchClassesteacher);
router.post("/classroom", verifyToken,fetchClassroomteacher);
router.post("/info/getbyid", verifyToken, GetTeacherDetails3);
router.post("/class/update", verifyToken, UpdateClass);
router.post("/fetch/rating", fetchRatings);



module.exports = router;

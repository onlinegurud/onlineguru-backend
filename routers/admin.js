const { CreateAdmin } = require("../controllers/superadmin/CreateAdmin");
const {
  verifyIsSuperAdmin,
} = require("../controllers/middleware/verifyIsSuperAdmin");
const { verifyIsAdmin } = require("../controllers/middleware/verifyIsAdmin");

const { verifyToken } = require("../controllers/middleware/verifyToken");
const { removeUser } = require("../controllers/admin/removeUser");
const { UpdateAdmin } = require("../controllers/admin/updateAdmin");
const { GetAdminDetails } = require("../controllers/admin/getAdminDetails");
const { GetUserDetails } = require("../controllers/admin/getUserDetails");
const {
  GetAdminsDetails,
} = require("../controllers/superadmin/getAdminsDetail");
const { updateProperties } = require("../controllers/admin/updateProperties");
const { updatePrice } = require("../controllers/admin/updatePrice");
const { removeAdmin } = require("../controllers/superadmin/removeadmin");
const { Adminclassroom } = require("../controllers/adminclassroom");
const { UpdatePrice } = require("../controllers/updateprice");
const { UpdateStatus } = require("../controllers/updatestatus");
const { FetchAllUser } = require("../controllers/fetchalluser");


const router = require("express").Router();


router.post("/remove/user", verifyToken, verifyIsAdmin, removeUser);
router.post("/update/info", verifyToken, verifyIsAdmin, UpdateAdmin);
router.post("/info", verifyToken, verifyIsAdmin, GetAdminDetails);
router.post("/user/info", verifyToken, verifyIsAdmin, GetUserDetails);
router.post("/insert/properties", verifyToken, verifyIsAdmin, updateProperties);
router.post("/insert/price", verifyToken, verifyIsAdmin, updatePrice);
router.post("/fetch/classroom", verifyToken, verifyIsAdmin, Adminclassroom);
router.post("/update/price", verifyToken, verifyIsAdmin, UpdatePrice);
router.post("/update/status", verifyToken, verifyIsAdmin, UpdateStatus);
router.post("/fetch/user", verifyToken, verifyIsAdmin, FetchAllUser);


router.post("/remove/admin", verifyToken, verifyIsSuperAdmin, removeAdmin);
router.post("/register", verifyToken, verifyIsSuperAdmin, CreateAdmin);
router.post("/info/all", verifyToken, verifyIsSuperAdmin, GetAdminsDetails);

module.exports = router;

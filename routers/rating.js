const { AddRating } = require("../controllers/addRatings");
const { fetchRatings } = require("../controllers/fetchrating");

const router = require("express").Router();

router.post("/create", AddRating);
router.post("/fetch", fetchRatings);

module.exports = router;

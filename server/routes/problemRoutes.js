const router = require("express").Router();
const controller = require("../controllers/problemController");
router.get("/", controller.list);
router.get("/:id", controller.getOne);
module.exports = router;

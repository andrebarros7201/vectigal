const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/sign-up", authController.signUp);
router.post("/log-in", authController.logIn);

module.exports = router;

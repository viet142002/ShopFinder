const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.signUp());
router.post("/signin", authController.signIn());
router.post("/signin-google", authController.signInWithGoogle());
router.post("/signin-retailer", authController.singInRetailer());

module.exports = router;

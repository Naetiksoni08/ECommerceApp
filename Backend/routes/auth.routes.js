const router = require("express").Router();
const Authcontroller = require("../controllers/auth.controller")


router.post("/login", Authcontroller.login);
router.post("/register", Authcontroller.register);
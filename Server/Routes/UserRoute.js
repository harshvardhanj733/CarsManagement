const express = require("express");
import {RegisterUser, LoginUser} from "../Controllers/UserController.js";

//router object
const router = express.Router();

// Register User || POST Method
router.post("/register-user", RegisterUser);

//LOGIN || POST
router.post("/login-user", LoginUser);

module.exports = router;
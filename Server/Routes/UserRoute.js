import express from 'express'
import {RegisterUser, LoginUser} from "../Controllers/UserController.js";

//router object
const UserRouter = express.Router();

// Register User || POST Method
UserRouter.post("/register-user", RegisterUser);

//LOGIN || POST
UserRouter.post("/login-user", LoginUser);

export default UserRouter;
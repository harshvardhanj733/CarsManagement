import UserModel from "../Models/UserModel";
const bcrypt = require("bcrypt");

//Register/Create User
exports.RegisterUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Handling improper details
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Kindly Fill All Fields to Procede",
      });
    }

    //Handling exisiting user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "User Already Exisits. Kindly Login with this Email",
      });
    }


    //Making a new user

    //Encrypting the password of a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    //Saving the new user in MongoDB Atlas database
    const user = new UserModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(200).send({
      success: true,
      message: `New User with Username ${username} Created Successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server Error In Registration, Kindly Try Again Later",
      success: false,
      error,
    });
  }
};

//Login User
exports.LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Handling improper details
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Enter the Email and/or Password",
      });
    }

    //Handling Incorrect Email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "This Email is Not Registerd, Kindly Register this Email to Proceed",
      });
    }

    //Handling Incorrect Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invlid Username or Password",
      });
    }

    //User Logged in Successfully
    return res.status(200).send({
      success: true,
      messgae: `Username ${username} Logged In Successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Server Error In Logging In, Kindly Try Again Later",
      error,
    });
  }
};
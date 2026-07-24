import userModel from "../models/userModel.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";


// =====================================
// REGISTER USER
// =====================================

const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Check fields
    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter all fields",

      });

    }


    // Check existing user
    const existingUser =
      await userModel.findOne({
        email: email.toLowerCase(),
      });


    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }


    // Hash password
    const salt =
      await bcrypt.genSalt(10);


    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );


    // Create user
    const newUser =
      new userModel({

        name,

        email:
          email.toLowerCase(),

        password:
          hashedPassword,

      });


    const user =
      await newUser.save();


    // Create JWT
    const token =
      jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }

      );


    res.status(201).json({

      success: true,

      message:
        "Registration successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

      },

    });


  } catch (error) {

    console.log(
      "Register Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Registration failed",

    });

  }

};



// =====================================
// LOGIN USER
// =====================================

const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Check fields
    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter email and password",

      });

    }


    // Find user
    const user =
      await userModel.findOne({

        email:
          email.toLowerCase(),

      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // Check password
    const passwordMatch =
      await bcrypt.compare(

        password,

        user.password

      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // Create JWT
    const token =
      jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }

      );


    res.json({

      success: true,

      message:
        "Login successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

      },

    });


  } catch (error) {

    console.log(
      "Login Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Login failed",

    });

  }

};


export {
  registerUser,
  loginUser
};
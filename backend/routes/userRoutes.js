import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decode = jwt.verify(token, "mukeshsecret");
      const tt = await User.findById(decode._id);
      res.status(200).json("Autorized User");
    } catch (error) {
      console.log("Error:", error.message);
      res.status(401).send("Unauthorized");
    }
  } else {
    console.log("NOT AUTHORIZED");
    res.status(401).send("Unauthorized");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res
        .status(201)
        .json({ message: "Registration successful", user: newUser });
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isuser = await User.findOne({ email });

    if (isuser) {
      const isMatch = await bcrypt.compare(password, isuser.password);

      if (isMatch) {
        const token = jwt.sign({ _id: isuser._id }, "mukeshsecret");
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ message: "Login successful", user: isuser });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } else {
      console.log("User is not present, please sign up first");
      res
        .status(401)
        .json({ message: "User not found. Please sign up first." });
    }
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).json("User Logout");
});

export default router;

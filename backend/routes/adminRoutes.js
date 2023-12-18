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

      if (tt && tt.role === "admin") {
        res.status(200).json({ message: "Authorized Admin", user: tt });
      } else {
        res.status(403).json({ message: "Forbidden: Only admins are authorized" });
      }
    } catch (error) {
      console.log("Error:", error.message);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    console.log("NOT AUTHORIZED");
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Admin already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new User({
        name,
        email,
        password: hashedPassword,
        role: "admin",
      });

      await newAdmin.save();
      res.status(201).json({ message: "Registration successful", user: newAdmin });
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserAdmin = await User.findOne({ email, role: "admin" });

    if (isUserAdmin) {
      const isMatch = await bcrypt.compare(password, isUserAdmin.password);

      if (isMatch) {
        const token = jwt.sign({ _id: isUserAdmin._id }, "mukeshsecret");
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ message: "Login successful", user: isUserAdmin });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } else {
      res.status(401).json({ message: "Admin not found. Please sign up first." });
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
  res.status(200).json({ message: "Admin Logout" });
});

export default router;

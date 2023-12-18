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

      if (tt && tt.role === "vendor") {
        res.status(200).json({ message: "Authorized Vendor", user: tt });
      } else {
        res.status(403).json({ message: "Forbidden: Only vendors are authorized" });
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
      return res.status(409).json({ message: "User already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newVendor = new User({
        name,
        email,
        password: hashedPassword,
        role: "vendor",
      });

      await newVendor.save();
      res.status(201).json({ message: "Registration successful", user: newVendor });
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserVendor = await User.findOne({ email, role: "vendor" });

    if (isUserVendor) {
      const isMatch = await bcrypt.compare(password, isUserVendor.password);

      if (isMatch) {
        const token = jwt.sign({ _id: isUserVendor._id }, "mukeshsecret");
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });

        res.status(200).json({ message: "Login successful", user: isUserVendor });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } else {
      res.status(401).json({ message: "Vendor not found. Please sign up first." });
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
  res.status(200).json({ message: "Vendor Logout" });
});

export default router;

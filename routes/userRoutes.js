import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { protect, adminOnly } from "../middlewere/auth.js";
const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch users" });
//   }
// });
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users", err.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, securityAnswer } = req.body;

  if (!name || !email || !password || !securityAnswer) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({ name, email, password, securityAnswer });
    await user.save();

    res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  //simple login
  // const { email, password } = req.body;

  // if (!email || !password) {
  //   return res.status(400).json({ error: "All fields are required" });
  // }

  // try {
  //   const user = await User.findOne({ email });

  //   if (!user) {
  //     return res.status(401).json({ error: "Invalid credentials" });
  //   }

  //   if (user.password !== password) {
  //     return res.status(401).json({ error: "Invalid credentials" });
  //   }
  //   const { password: _, ...userWithoutPassword } = user.toObject();
  //   return res.json({
  //     status: "success",
  //     message: "Login successful",
  //     user: userWithoutPassword,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ error: "Server error" });
  // }

  // jwt login
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "JWT_SECRET", {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    console.error("Error deleting user", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/recover-password", async (req, res) => {
  const { email, securityAnswer, newpassword } = req.body;
  if (!email || !securityAnswer || !newpassword) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // if (user.securityAnswer !== securityAnswer) {
    //   return res.status(400).json({ error: "Incorrect security answer" });
    // }
    const isMatch = await bcrypt.compare(securityAnswer, user.securityAnswer);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect security answer" });
    }
    // user.password = newpassword;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newpassword, salt);
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

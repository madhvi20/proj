const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  const { name, email, dateOfBirth } = req.body;
  try {
    const newUser = new User({ name, email, dateOfBirth });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving users", error: err });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { name, email, dateOfBirth } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, dateOfBirth }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: "Error updating user", error: err });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    res.status(400).json({ message: "Error deleting user", error: err });
  }
});

module.exports = router;

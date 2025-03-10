const mongoose = require("mongoose");
const User = require("../models/User");
const Prescription = require("../models/Prescription");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    // const users = await User.find();
    const users = await User.find({ role: 'patient' });
    if (users.length > 0) {
        return res.status(200).send(users);
    } else {
        return res.status(404).send("No Users Found")
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "prescriptions",
      model: Prescription});
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },

      { new: true }
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.send({
      message: "User updated Successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send("User not found");
    res.send(deletedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

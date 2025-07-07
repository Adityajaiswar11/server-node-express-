const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../MOCK_USER_DATA.json");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, dob } = req.body;

    if (!firstName || !lastName || !dob) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // checking existing users from file
    let users = [];
    try {
      const data = fs.readFileSync(filePath);
      users = JSON.parse(data || "[]");
    } catch {
      users = [];
    }

    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      dob,
    };

    const updatedUsers = [...users, newUser];

    fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2), (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to save user",
          success: false,
          error: err.message,
        });
      }

      return res.status(201).json({
        message: "User created successfully!",
        success: true,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
      success: false,
    });
  }
};

// Get Latest User function
exports.getLatestUser = async (req, res) => {
  try {
    const raw = fs.readFileSync(filePath);
    const users = JSON.parse(raw || "[]");

    if (!users.length) {
      return res.status(404).json({
        message: "No user found",
        success: false,
      });
    }

    const latestUser = users[users.length - 1];

    return res.status(200).json({
      success: true,
      data: latestUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch user",
      success: false,
      error: err.message,
    });
  }
};

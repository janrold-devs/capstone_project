const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    // Fetch user from MySQL by ID
    const user = await User.getUserById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Manually remove password
    delete user.password;
    
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

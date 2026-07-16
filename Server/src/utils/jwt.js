const jwt = require("jsonwebtoken");


const Sign = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRY || "7d" },
  );
};

const Verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = { Sign, Verify };

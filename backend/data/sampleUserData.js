const bcrypt = require("bcryptjs");

const users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456789", 8),
    isAdmin: true,
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("123456789", 8),
  },
];

module.exports = users

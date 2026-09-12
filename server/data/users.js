const bcrypt = require("bcryptjs");
const users = [{ id: "demo-admin", fullName: "IDEALAUNCH Admin", username: "admin", email: "admin@idealaunch.demo", passwordHash: bcrypt.hashSync("123456", 10), createdAt: "2026-09-10", favourites: [], recentlyViewed: [] }];
module.exports = users;

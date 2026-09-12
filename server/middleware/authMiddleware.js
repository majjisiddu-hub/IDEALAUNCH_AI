const jwt = require("jsonwebtoken");
const users = require("../data/users");
function authMiddleware(req, res, next) { const header = req.headers.authorization || ""; const token = header.startsWith("Bearer ") ? header.slice(7) : null; if (!token) return res.status(401).json({ success: false, message: "Please login to continue" }); try { const payload = jwt.verify(token, process.env.JWT_SECRET); const user = users.find((item) => item.id === payload.userId); if (!user) return res.status(401).json({ success: false, message: "Please login to continue" }); req.user = user; next(); } catch { return res.status(401).json({ success: false, message: "Please login to continue" }); } }
module.exports = authMiddleware;

require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express"); const cors = require("cors"); const authRoutes = require("./routes/authRoutes"); const ideaRoutes = require("./routes/ideaRoutes"); const userRoutes = require("./routes/userRoutes"); const aiRoutes = require("./routes/aiRoutes"); const { notFound, errorHandler } = require("./middleware/errorMiddleware");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");
const app = express(); const port = Number(process.env.PORT) || 5000;
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" })); app.use(express.json({ limit: "100kb" }));
app.get("/api/health", (req, res) => res.json({ success: true, message: "IDEALAUNCH API is running" })); app.use("/api/auth", authRoutes); app.use("/api/ideas", ideaRoutes); app.use("/api/users", userRoutes); app.use("/api/ai", aiRoutes); app.use(notFound); app.use(errorHandler);
app.listen(port, () => console.log(`IDEALAUNCH API running on http://localhost:${port}`));

const { allIdeas } = require("./ideaController");
const { fetchProblems } = require("../services/problemService");
const { generateResponse } = require("../services/aiService");
async function chat(req, res) { const { message, ideaId, problemId } = req.body || {}; if (!message || !String(message).trim()) return res.status(400).json({ success: false, message: "An AI action is required" }); const idea = ideaId ? allIdeas().find((item) => item.id === ideaId) : null; let problem = null; if (problemId) { const result = await fetchProblems(); if (result.available) problem = result.problems.find((item) => item.id === problemId) || null; } const result = await generateResponse({ message, idea, problem }); if (!result.available) return res.status(503).json({ success: false, available: false, response: result.response }); res.json({ success: true, response: result.response }); }
module.exports = { chat };

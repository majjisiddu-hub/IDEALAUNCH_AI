const { safeUser } = require("./authController");
const ideas = require("./ideaController");
function profile(req, res) { res.json({ success: true, user: safeUser(req.user) }); }
function updateProfile(req, res) { const { fullName, email } = req.body || {}; if (!fullName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: "Full name and a valid email are required" }); req.user.fullName = fullName.trim(); req.user.email = email.toLowerCase().trim(); res.json({ success: true, user: safeUser(req.user) }); }
function favourites(req, res) { res.json({ success: true, ideas: ideas.allIdeas().filter((idea) => req.user.favourites.includes(idea.id)) }); }
function addFavourite(req, res) { if (!ideas.allIdeas().some((idea) => idea.id === req.params.ideaId)) return res.status(404).json({ success: false, message: "Idea not found" }); if (!req.user.favourites.includes(req.params.ideaId)) req.user.favourites.unshift(req.params.ideaId); res.json({ success: true, favourites: req.user.favourites }); }
function removeFavourite(req, res) { req.user.favourites = req.user.favourites.filter((id) => id !== req.params.ideaId); res.json({ success: true, favourites: req.user.favourites }); }
function recentlyViewed(req, res) { res.json({ success: true, ideas: ideas.allIdeas().filter((idea) => req.user.recentlyViewed.includes(idea.id)).sort((a, b) => req.user.recentlyViewed.indexOf(a.id) - req.user.recentlyViewed.indexOf(b.id)) }); }
function addRecentlyViewed(req, res) { if (!ideas.allIdeas().some((idea) => idea.id === req.params.ideaId)) return res.status(404).json({ success: false, message: "Idea not found" }); req.user.recentlyViewed = [req.params.ideaId, ...req.user.recentlyViewed.filter((id) => id !== req.params.ideaId)].slice(0, 6); res.json({ success: true, recentlyViewed: req.user.recentlyViewed }); }
module.exports = { profile, updateProfile, favourites, addFavourite, removeFavourite, recentlyViewed, addRecentlyViewed };

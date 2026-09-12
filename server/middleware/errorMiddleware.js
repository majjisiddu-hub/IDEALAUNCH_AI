function notFound(req, res) { res.status(404).json({ success: false, message: "Route not found" }); }
function errorHandler(error, req, res, next) { console.error(error); res.status(error.status || 500).json({ success: false, message: error.status ? error.message : "Something went wrong. Please try again." }); }
module.exports = { notFound, errorHandler };

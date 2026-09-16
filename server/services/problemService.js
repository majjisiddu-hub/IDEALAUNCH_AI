const sourceUrl = process.env.PROBLEMS_SOURCE_URL;

async function fetchProblems() {
  if (!sourceUrl) return { available: false, reason: "Real-time problem data is currently unavailable." };
  const response = await fetch(sourceUrl, { headers: process.env.PROBLEMS_SOURCE_API_KEY ? { Authorization: `Bearer ${process.env.PROBLEMS_SOURCE_API_KEY}` } : {} });
  if (!response.ok) throw new Error(`Problems source returned ${response.status}`);
  const payload = await response.json();
  const problems = Array.isArray(payload) ? payload : payload.problems;
  if (!Array.isArray(problems)) throw new Error("Problems source returned an unsupported format");
  return { available: true, problems: problems.map(normalizeProblem), retrievedAt: new Date().toISOString() };
}
function normalizeProblem(problem) { return { id: String(problem.id), title: String(problem.title), description: String(problem.description), category: problem.category, location: problem.location, severity: problem.severity, affectedPeople: problem.affectedPeople, reportedAt: problem.reportedAt, status: problem.status, opportunity: problem.opportunity, source: problem.source, sourceUrl: problem.sourceUrl, retrievedAt: problem.retrievedAt, lastUpdated: problem.lastUpdated, tags: Array.isArray(problem.tags) ? problem.tags : [], whyItMatters: problem.whyItMatters }; }
module.exports = { fetchProblems, normalizeProblem };

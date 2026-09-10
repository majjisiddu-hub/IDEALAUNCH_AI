document.addEventListener("DOMContentLoaded", () => {
  const featuredGrid = document.querySelector("#featured-grid");
  const recentGrid = document.querySelector("#recent-grid");
  if (!featuredGrid || !recentGrid) return;

  const featuredIdeas = getAllIdeas().slice(0, 3);
  featuredGrid.innerHTML = featuredIdeas.map(createIdeaCard).join("");
  bindFavouriteButtons(featuredGrid);

  const recentIdeas = getIdeasByIds(getViewedIds());
  if (!recentIdeas.length) {
    recentGrid.innerHTML = `<div class="recent-empty"><span class="empty-icon small">↗</span><p>Your viewed ideas will appear here.</p><a href="ideas.html">Browse the library</a></div>`;
  } else {
    recentGrid.innerHTML = recentIdeas.slice(0, 3).map((idea) => { const title = idea.title || idea.name; return `<a class="recent-item" href="idea-details.html?id=${idea.id}"><span class="recent-item-icon">${title.charAt(0)}</span><span><strong>${title}</strong><small>${idea.category}</small></span><span class="arrow">↗</span></a>`; }).join("");
  }

  const allIdeas = getAllIdeas();
  const submittedIdeas = getUserIdeas().filter((idea) => idea.createdBy === getUsername());
  const statGrid = document.querySelector(".stat-grid");
  if (statGrid && !statGrid.querySelector("[data-submitted-count]")) {
    statGrid.insertAdjacentHTML("afterbegin", '<div class="stat-card"><span class="stat-label">Your Ideas</span><strong class="stat-value" data-submitted-count>0</strong><span class="stat-note">Your contributions</span></div>');
  }
  document.querySelectorAll("[data-total-ideas]").forEach((element) => { element.textContent = allIdeas.length; });
  document.querySelectorAll("[data-category-count]").forEach((element) => { element.textContent = new Set(allIdeas.map((idea) => idea.category)).size; });
  document.querySelectorAll("[data-viewed-count]").forEach((element) => { element.textContent = getViewedIds().length; });
  const submittedCount = document.querySelector("[data-submitted-count]");
  if (submittedCount) submittedCount.textContent = submittedIdeas.length;
  const contributionSection = document.createElement("section");
  contributionSection.className = "contribution-dashboard";
  contributionSection.innerHTML = `<div class="section-heading"><div><span class="section-label">Your Contributions</span><h2>Make your mark</h2></div><a class="button button-primary" href="submit-idea.html">Submit New Idea</a></div><div class="recent-list"><div class="recent-item" id="contribution-latest"><span class="recent-item-icon">＋</span><span><strong>No submitted ideas yet</strong><small>Share your first concept</small></span></div></div>`;
  const existingContribution = document.querySelector(".contribution-dashboard");
  if (!existingContribution) document.querySelector(".recent-layout")?.insertAdjacentElement("afterend", contributionSection);
  const contribution = (existingContribution || contributionSection).querySelector("#contribution-latest");
  if (contribution && submittedIdeas.length) {
    const latest = submittedIdeas[submittedIdeas.length - 1];
    contribution.innerHTML = `<span class="recent-item-icon">${latest.name.charAt(0)}</span><span><strong>${latest.name}</strong><small>${latest.category} · ${latest.date}</small></span><a class="arrow" href="idea-details.html?id=${latest.id}">↗</a>`;
  }
  const main = document.querySelector(".main-content");
  if (main && !document.querySelector(".ai-dashboard-card")) {
    const aiCard = document.createElement("section");
    aiCard.className = "ai-dashboard-card";
    aiCard.innerHTML = `<div><span class="ai-spark">✦</span><div><span class="section-label">IDEALAUNCH AI</span><h2>Your next thinking partner.</h2><p>Analyze ideas, discover opportunities, find business models and plan your launch.</p></div></div><a class="button button-primary" href="ai-helper.html">Ask AI <span>→</span></a>`;
    main.appendChild(aiCard);
  }
  updateSavedCounts();
});

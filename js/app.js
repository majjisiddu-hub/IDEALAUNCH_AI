const ideas = [
  {
    id: "orbitdesk",
    title: "OrbitDesk",
    category: "Technology",
    description: "A calm command center that turns scattered team tools into one focused workspace.",
    rating: 4.9,
    problem: "Modern teams lose momentum switching between chat, project boards, documents, and analytics.",
    solution: "OrbitDesk creates a contextual workspace that surfaces the right conversation, task, and metric together.",
    audience: "Distributed startups, creative teams, and operations leaders.",
    businessModel: "Per-seat SaaS with premium automation add-ons.",
    features: ["Contextual workspaces", "Smart task routing", "Weekly focus reports", "Tool integrations"],
    tags: ["productivity", "saas", "remote work"]
  },
  {
    id: "skillforge",
    title: "SkillForge",
    category: "Education",
    description: "Project-based learning paths that help professionals build proof of skill, not just certificates.",
    rating: 4.8,
    problem: "Learners struggle to translate online course completion into credible, practical work samples.",
    solution: "SkillForge pairs short lessons with real client-style briefs and a portfolio review loop.",
    audience: "Career switchers, bootcamp graduates, and ambitious professionals.",
    businessModel: "Subscription plans plus employer-sponsored cohorts.",
    features: ["Guided project briefs", "Expert feedback", "Portfolio builder", "Hiring partner network"],
    tags: ["learning", "careers", "portfolio"]
  },
  {
    id: "pocketpilot",
    title: "PocketPilot",
    category: "Finance",
    description: "A friendly financial co-pilot that turns irregular income into a clear monthly plan.",
    rating: 4.7,
    problem: "Freelancers and contractors have difficulty planning around variable pay and unpredictable expenses.",
    solution: "PocketPilot forecasts cash flow, creates flexible envelopes, and explains financial trade-offs in plain language.",
    audience: "Freelancers, creators, consultants, and independent contractors.",
    businessModel: "Freemium app with a paid planning tier and partner referrals.",
    features: ["Income forecasting", "Tax set-asides", "Goal envelopes", "Plain-language insights"],
    tags: ["money", "freelance", "planning"]
  },
  {
    id: "carecircle",
    title: "CareCircle",
    category: "Health",
    description: "A coordinated care journal that keeps families aligned around everyday health routines.",
    rating: 4.6,
    problem: "Families caring for a loved one often coordinate medication, appointments, and updates in fragmented channels.",
    solution: "CareCircle gives trusted family members one private timeline for routines, notes, and care responsibilities.",
    audience: "Family caregivers, older adults, and home-care providers.",
    businessModel: "Family subscription with provider dashboard licensing.",
    features: ["Shared care timeline", "Medication reminders", "Appointment notes", "Permission controls"],
    tags: ["wellness", "caregiving", "family"]
  },
  {
    id: "greengrid",
    title: "GreenGrid",
    category: "Environment",
    description: "Neighborhood energy insights that make collective sustainability measurable and motivating.",
    rating: 4.8,
    problem: "People want to reduce energy use but rarely see how small actions add up at a community level.",
    solution: "GreenGrid visualizes anonymized neighborhood trends and rewards collective efficiency milestones.",
    audience: "Property managers, municipalities, and climate-conscious neighborhoods.",
    businessModel: "B2B platform licensing with utility partnerships.",
    features: ["Energy dashboards", "Community challenges", "Action recommendations", "Impact reporting"],
    tags: ["climate", "energy", "community"]
  },
  {
    id: "fixflow",
    title: "FixFlow",
    category: "Services",
    description: "A trusted local repair marketplace built around transparent pricing and reliable arrival windows.",
    rating: 4.5,
    problem: "Finding dependable home repair help still involves uncertain pricing, vague availability, and poor communication.",
    solution: "FixFlow matches customers with verified pros using clear scopes, fixed estimates, and live job updates.",
    audience: "Homeowners, renters, property managers, and local tradespeople.",
    businessModel: "Transaction fee plus pro membership subscriptions.",
    features: ["Verified professionals", "Fixed-price scopes", "Arrival tracking", "Work guarantees"],
    tags: ["home", "marketplace", "repairs"]
  },
  {
    id: "closetloop",
    title: "ClosetLoop",
    category: "E-commerce",
    description: "A circular wardrobe platform that makes reselling, swapping, and styling pre-loved pieces effortless.",
    rating: 4.4,
    problem: "People own quality clothes they no longer wear, but listing and finding the right next owner takes too much effort.",
    solution: "ClosetLoop uses style profiles and guided listings to match garments with interested local buyers or swappers.",
    audience: "Style-conscious shoppers, resale communities, and independent boutiques.",
    businessModel: "Marketplace transaction fees and boutique tools.",
    features: ["Guided listings", "Style matching", "Swap events", "Circularity scores"],
    tags: ["fashion", "resale", "circular"]
  },
  {
    id: "briefly",
    title: "Briefly",
    category: "Technology",
    description: "A lightweight research companion that turns long reports into decision-ready team briefs.",
    rating: 4.3,
    problem: "Important research gets buried because teams lack time to extract shared, actionable takeaways.",
    solution: "Briefly organizes source material into cited summaries, open questions, and decision checkpoints.",
    audience: "Product teams, agencies, analysts, and founders.",
    businessModel: "Team SaaS plans with enterprise knowledge controls.",
    features: ["Cited summaries", "Decision templates", "Shared research rooms", "Source tracking"],
    tags: ["research", "insights", "teams"]
  },
  {
    id: "mealmap",
    title: "MealMap",
    category: "Health",
    description: "Practical meal planning for real schedules, budgets, dietary needs, and local grocery options.",
    rating: 4.2,
    problem: "Meal planning tools often ignore budget, time, and the ingredients people can actually buy nearby.",
    solution: "MealMap generates flexible plans based on constraints and turns them into smart, low-waste shopping lists.",
    audience: "Busy households, students, and people managing dietary goals.",
    businessModel: "Subscription with grocery and nutrition partner revenue.",
    features: ["Constraint-based plans", "Adaptive shopping lists", "Budget tracking", "Pantry reminders"],
    tags: ["nutrition", "food", "habits"]
  },
  {
    id: "grantlane",
    title: "GrantLane",
    category: "Education",
    description: "A transparent grant discovery and application workspace for small community organizations.",
    rating: 4.1,
    problem: "Small nonprofits miss funding opportunities because eligibility research and applications are time-intensive.",
    solution: "GrantLane matches organizations with relevant grants and guides teams through reusable application assets.",
    audience: "Community nonprofits, school programs, and local initiatives.",
    businessModel: "Organization subscriptions and funder intelligence plans.",
    features: ["Eligibility matching", "Deadline workspace", "Reusable answers", "Impact narrative tools"],
    tags: ["funding", "nonprofit", "community"]
  }
];

const FAVOURITES_KEY = "startupHubFavourites";
const VIEWED_KEY = "startupHubViewed";
const USER_IDEAS_KEY = "startupHubUserIdeas";

function isLoggedIn() {
  return sessionStorage.getItem("isLoggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true";
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

function getUsername() {
  return sessionStorage.getItem("username") || "Explorer";
}

function getCurrentUser() {
  return { id: sessionStorage.getItem("userId") || "", username: getUsername(), fullName: sessionStorage.getItem("fullName") || getUsername(), email: sessionStorage.getItem("email") || "" };
}

function getUserIdeas() {
  try {
    const stored = JSON.parse(localStorage.getItem(USER_IDEAS_KEY) || "[]");
    return Array.isArray(stored) ? stored.filter((idea) => idea && idea.id) : [];
  } catch (error) {
    return [];
  }
}

function saveUserIdeas(userIdeas) {
  localStorage.setItem(USER_IDEAS_KEY, JSON.stringify(userIdeas));
}

function getAllIdeas() {
  return [...ideas, ...getUserIdeas()];
}

function getStoredIds(key) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    return [];
  }
}

function getAccountStorage(key) {
  const username = getUsername();
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "{}");
    if (stored && !Array.isArray(stored) && Array.isArray(stored[username])) return stored[username];
    if (Array.isArray(stored)) {
      const migrated = { [username]: stored };
      localStorage.setItem(key, JSON.stringify(migrated));
      return stored;
    }
    return [];
  } catch (error) {
    return [];
  }
}

function saveAccountStorage(key, ids) {
  const username = getUsername();
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(key) || "{}"); } catch (error) { stored = {}; }
  if (!stored || Array.isArray(stored)) stored = {};
  stored[username] = ids;
  localStorage.setItem(key, JSON.stringify(stored));
}

function saveStoredIds(key, ids) {
  localStorage.setItem(key, JSON.stringify(ids));
}

function getFavouriteIds() {
  return getAccountStorage(FAVOURITES_KEY);
}

function getViewedIds() {
  return getAccountStorage(VIEWED_KEY);
}

function isFavourite(id) {
  return getFavouriteIds().includes(id);
}

function toggleFavourite(id) {
  const favourites = getFavouriteIds();
  const next = favourites.includes(id)
    ? favourites.filter((favouriteId) => favouriteId !== id)
    : [id, ...favourites];
  saveAccountStorage(FAVOURITES_KEY, next);
  return next;
}

function markAsViewed(id) {
  const viewed = getViewedIds().filter((viewedId) => viewedId !== id);
  saveAccountStorage(VIEWED_KEY, [id, ...viewed].slice(0, 6));
}

function getIdeaById(id) {
  return getAllIdeas().find((idea) => idea.id === id);
}

function getIdeasByIds(ids) {
  return ids.map((id) => getIdeaById(id)).filter(Boolean);
}

function renderShell() {
  const usernameElements = document.querySelectorAll("[data-username]");
  usernameElements.forEach((element) => {
    element.textContent = getUsername();
  });
  const dashboardGreeting = document.querySelector("h1 [data-username]");
  if (dashboardGreeting && window.location.pathname.endsWith("dashboard.html")) dashboardGreeting.textContent = getCurrentUser().fullName;

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => {
      ["isLoggedIn", "loggedIn", "username", "userId", "fullName", "email"].forEach((key) => sessionStorage.removeItem(key));
      window.location.href = "index.html";
    });
  });

  document.querySelectorAll(".nav-list").forEach((nav) => {
    if (!nav.querySelector('a[href="submit-idea.html"]')) {
      nav.insertAdjacentHTML("beforeend", '<a class="nav-link" href="submit-idea.html"><span class="nav-icon">＋</span>Submit Idea</a>');
    }
    if (!nav.querySelector('a[href="ai-helper.html"]')) {
      nav.insertAdjacentHTML("beforeend", '<a class="nav-link" href="ai-helper.html"><span class="nav-icon">✦</span>IDEALAUNCH AI</a>');
    }
  });

  const menuButton = document.querySelector("[data-menu-toggle]");
  const sidebar = document.querySelector(".sidebar");
  if (menuButton && sidebar) {
    menuButton.addEventListener("click", () => {
      sidebar.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", sidebar.classList.contains("is-open"));
    });
  }
}

function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

function createIdeaCard(idea) {
  const favourite = isFavourite(idea.id);
  const title = idea.title || idea.name;
  const ratingLabel = idea.rating > 0 ? `<span class="star">★</span><strong>${idea.rating.toFixed(1)}</strong><span class="muted">Top-rated concept</span>` : `<strong class="new-rating">New</strong><span class="muted">Community submission</span>`;
  return `
    <article class="idea-card">
      <div class="idea-card-topline">
        <span class="category-pill">${idea.category}</span>
        <button class="icon-button favourite-button ${favourite ? "is-favourite" : ""}" data-favourite-id="${idea.id}" aria-label="${favourite ? "Remove" : "Save"} ${title}" title="${favourite ? "Remove from favourites" : "Save to favourites"}">
          <span class="heart-icon">${favourite ? "♥" : "♡"}</span>
        </button>
      </div>
      ${idea.isUserSubmitted ? '<span class="community-badge">Community Idea</span>' : ""}
      <h3>${title}</h3>
      <p>${idea.description}</p>
      <div class="rating-row">${ratingLabel}</div>
      <div class="tag-list">${idea.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div>
      <a class="button button-secondary card-action" href="idea-details.html?id=${idea.id}">View details <span>↗</span></a>
    </article>`;
}

function bindFavouriteButtons(container) {
  container.querySelectorAll("[data-favourite-id]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleFavourite(button.dataset.favouriteId);
      const card = button.closest(".idea-card");
      const isNowFavourite = isFavourite(button.dataset.favouriteId);
      button.classList.toggle("is-favourite", isNowFavourite);
      button.setAttribute("aria-label", `${isNowFavourite ? "Remove" : "Save"} favourite`);
      button.setAttribute("title", isNowFavourite ? "Remove from favourites" : "Save to favourites");
      button.querySelector(".heart-icon").textContent = isNowFavourite ? "♥" : "♡";
      if (card && container.dataset.favouritesList === "true" && !isNowFavourite) {
        card.remove();
        if (!container.querySelector(".idea-card")) {
          renderEmptyState(container, "No saved ideas yet", "Save promising concepts from the Ideas library and they will appear here.", "ideas.html", "Explore ideas");
        }
      }
      updateSavedCounts();
    });
  });
}

function renderEmptyState(container, title, message, href, label) {
  container.innerHTML = `<div class="empty-state"><div class="empty-icon">✦</div><h3>${title}</h3><p>${message}</p><a class="button button-primary" href="${href}">${label}</a></div>`;
}

function updateSavedCounts() {
  document.querySelectorAll("[data-saved-count]").forEach((element) => {
    element.textContent = getFavouriteIds().length;
  });
}

function initIdeasPage() {
  const grid = document.querySelector("#ideas-grid");
  if (!grid) return;
  const searchInput = document.querySelector("#idea-search");
  const categorySelect = document.querySelector("#category-filter");
  const sortSelect = document.querySelector("#sort-ideas");
  const resultCount = document.querySelector("#result-count");
  getAllIdeas().map((idea) => idea.category).filter((category, index, categories) => categories.indexOf(category) === index).forEach((category) => {
    if (![...categorySelect.options].some((option) => option.value === category)) {
      categorySelect.insertAdjacentHTML("beforeend", `<option value="${category}">${category}</option>`);
    }
  });
  const ideaMessage = sessionStorage.getItem("ideaMessage");
  if (ideaMessage) {
    const message = document.createElement("div");
    message.className = "form-message success page-message";
    message.textContent = ideaMessage;
    grid.parentElement.insertBefore(message, grid);
    sessionStorage.removeItem("ideaMessage");
  }

  const render = () => {
    const search = (searchInput.value || "").trim().toLowerCase();
    const category = categorySelect.value;
    const sort = sortSelect.value;
    let filtered = getAllIdeas().filter((idea) => {
      const searchable = [idea.title || idea.name, idea.description, idea.category, idea.audience || idea.targetAudience, ...(idea.tags || [])].join(" ").toLowerCase();
      return searchable.includes(search) && (category === "all" || idea.category === category);
    });
    if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") filtered = [...filtered].reverse();
    if (sort === "az") filtered.sort((a, b) => (a.title || a.name).localeCompare(b.title || b.name));
    resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? "idea" : "ideas"}`;
    if (!filtered.length) {
      renderEmptyState(grid, "No ideas found", "Try a different search term or broaden your category filter.", "ideas.html", "Reset library");
      return;
    }
    grid.innerHTML = filtered.map(createIdeaCard).join("");
    bindFavouriteButtons(grid);
  };

  searchInput.addEventListener("input", render);
  categorySelect.addEventListener("change", render);
  sortSelect.addEventListener("change", render);
  render();
}

function initDetailsPage() {
  const detailView = document.querySelector("#idea-detail-view");
  if (!detailView) return;
  const id = new URLSearchParams(window.location.search).get("id");
  const idea = getIdeaById(id);
  if (!idea) {
    renderEmptyState(detailView, "Idea not found", "That concept may have moved or the link is incomplete.", "ideas.html", "Return to ideas");
    return;
  }
  markAsViewed(idea.id);
  const favourite = isFavourite(idea.id);
  const title = idea.title || idea.name;
  const communityMeta = idea.isUserSubmitted ? `<span class="community-badge detail-badge">Community Idea</span><span class="submitted-by">Submitted by: ${idea.createdBy}</span>` : "";
  const ratingLabel = idea.rating > 0 ? `<span class="star">★</span><strong>${idea.rating.toFixed(1)}</strong><span class="muted">Community rating</span>` : `<strong class="new-rating">New</strong><span class="muted">Community submission</span>`;
  detailView.innerHTML = `
    <div class="detail-header">
      <div><span class="category-pill">${idea.category}</span>${communityMeta}<h1>${title}</h1><p class="detail-description">${idea.description}</p><div class="rating-row">${ratingLabel}</div></div>
      <button class="button ${favourite ? "button-primary" : "button-secondary"}" id="detail-favourite"><span>${favourite ? "♥" : "♡"}</span> ${favourite ? "Saved" : "Save idea"}</button>
    </div>
    <div class="detail-grid">
      <section class="detail-section"><span class="section-label">The opportunity</span><h2>The problem</h2><p>${idea.problem}</p></section>
      <section class="detail-section accent-section"><span class="section-label">The approach</span><h2>The solution</h2><p>${idea.solution}</p></section>
      <section class="detail-section"><span class="section-label">Who it serves</span><h2>Target audience</h2><p>${idea.audience || idea.targetAudience}</p></section>
      <section class="detail-section"><span class="section-label">How it grows</span><h2>Business model</h2><p>${idea.businessModel}</p></section>
    </div>
    <section class="features-section"><div><span class="section-label">Product snapshot</span><h2>Key features</h2></div><div class="feature-list">${idea.features.map((feature, index) => `<div class="feature-item"><span>0${index + 1}</span><strong>${feature}</strong></div>`).join("")}</div></section>
    <div class="detail-tags">${idea.tags.map((tag) => `<span>#${tag}</span>`).join("")}</div>`;
  document.querySelector("#detail-favourite").addEventListener("click", (event) => {
    const nowFavourite = toggleFavourite(idea.id).includes(idea.id);
    event.currentTarget.className = `button ${nowFavourite ? "button-primary" : "button-secondary"}`;
    event.currentTarget.innerHTML = `<span>${nowFavourite ? "♥" : "♡"}</span> ${nowFavourite ? "Saved" : "Save idea"}`;
    updateSavedCounts();
  });
  if (!document.querySelector("#ask-ai-button")) {
    document.querySelector("#detail-favourite").insertAdjacentHTML("afterend", `<a class="button button-quiet ask-ai-button" id="ask-ai-button" href="ai-helper.html?ideaId=${encodeURIComponent(idea.id)}">✦ Ask IDEALAUNCH AI</a>`);
  }
}

function initFavouritesPage() {
  const grid = document.querySelector("#favourites-grid");
  if (!grid) return;
  grid.dataset.favouritesList = "true";
  const savedIdeas = getIdeasByIds(getFavouriteIds());
  if (!savedIdeas.length) {
    renderEmptyState(grid, "No saved ideas yet", "Save promising concepts from the Ideas library and they will appear here.", "ideas.html", "Explore ideas");
    return;
  }
  grid.innerHTML = savedIdeas.map(createIdeaCard).join("");
  bindFavouriteButtons(grid);
}

function initProfilePage() {
  const viewedCount = document.querySelector("#viewed-count");
  if (!viewedCount) return;
  document.querySelectorAll("[data-profile-username]").forEach((element) => { element.textContent = getUsername(); });
  const user = getCurrentUser();
  const initials = user.fullName.split(/\s+/).map((part) => part.charAt(0)).join("").slice(0, 2).toUpperCase();
  const profileAvatar = document.querySelector(".profile-avatar");
  if (profileAvatar) profileAvatar.textContent = initials || user.username.charAt(0).toUpperCase();
  const profileHeading = document.querySelector(".profile-card h2");
  if (profileHeading) profileHeading.textContent = user.fullName;
  const profileSubtitle = document.querySelector(".profile-card-main p");
  if (profileSubtitle) profileSubtitle.textContent = `@${user.username}`;
  const accountBadge = document.querySelector(".account-badge");
  if (accountBadge) accountBadge.textContent = user.username === "admin" ? "Demo account" : "IDEALAUNCH Member";
  const profileData = document.querySelector(".profile-data");
  if (profileData) {
    profileData.innerHTML = `<div class="profile-data-row"><span>Full Name</span><strong>${user.fullName}</strong></div><div class="profile-data-row"><span>Username</span><strong>${user.username}</strong></div><div class="profile-data-row"><span>Email</span><strong>${user.email || "Not provided"}</strong></div><div class="profile-data-row"><span>Account type</span><strong>${user.username === "admin" ? "Demo account" : "IDEALAUNCH Member"}</strong></div><div class="profile-data-row"><span>Created</span><strong>${getAccountCreationDate(user.id)}</strong></div>`;
  }
  viewedCount.textContent = getViewedIds().length;
  updateSavedCounts();
  const profileLayout = document.querySelector(".profile-layout");
  if (!profileLayout) return;
  const ownIdeas = getUserIdeas().filter((idea) => idea.createdBy === getUsername() && (!idea.createdByUserId || idea.createdByUserId === user.id));
  const section = document.createElement("section");
  section.className = "submitted-section";
  section.innerHTML = `<div class="section-heading"><div><span class="section-label">Your contributions</span><h2>My Submitted Ideas</h2></div><a class="button button-primary" href="submit-idea.html">Submit Your First Idea</a></div><div id="submitted-ideas-grid" class="submitted-grid"></div>`;
  profileLayout.insertAdjacentElement("afterend", section);
  renderSubmittedIdeas(section, ownIdeas);
}

function getAccountCreationDate(userId) {
  try {
    const users = JSON.parse(localStorage.getItem("startupHubUsers") || "[]");
    const user = Array.isArray(users) ? users.find((account) => account.id === userId) : null;
    return user ? user.createdAt : "Today";
  } catch (error) {
    return "Today";
  }
}

function renderSubmittedIdeas(section, ownIdeas) {
  const grid = section.querySelector("#submitted-ideas-grid");
  if (!ownIdeas.length) {
    grid.innerHTML = `<div class="empty-state"><div class="empty-icon">＋</div><h3>You haven't submitted any startup ideas yet.</h3><p>Share the problem you want to solve and give the community a new direction to explore.</p><a class="button button-primary" href="submit-idea.html">Submit Your First Idea</a></div>`;
    return;
  }
  grid.innerHTML = ownIdeas.map((idea) => `<article class="contribution-card"><div><span class="community-badge">Community Idea</span><h3>${idea.name}</h3><span class="category-pill">${idea.category}</span></div><p>${idea.description}</p><div class="contribution-meta"><span>${idea.date}</span><span>${idea.tags.join(" · ")}</span></div><div class="contribution-actions"><a class="button button-secondary" href="idea-details.html?id=${idea.id}">View Details</a><a class="button button-quiet" href="submit-idea.html?id=${idea.id}">Edit</a><button class="button delete-button" type="button" data-delete-idea="${idea.id}">Delete</button></div></article>`).join("");
  grid.querySelectorAll("[data-delete-idea]").forEach((button) => {
    button.addEventListener("click", () => {
      const idea = getUserIdeas().find((item) => item.id === button.dataset.deleteIdea);
      if (!idea || !idea.isUserSubmitted || idea.createdBy !== getUsername() || (idea.createdByUserId && idea.createdByUserId !== getCurrentUser().id)) return;
      if (!window.confirm("Are you sure you want to delete this startup idea?")) return;
      const remaining = getUserIdeas().filter((item) => item.id !== idea.id);
      saveUserIdeas(remaining);
      renderSubmittedIdeas(section, remaining.filter((item) => item.createdBy === getUsername()));
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (!requireAuth()) return;
  renderShell();
  setActiveNavigation();
  initIdeasPage();
  initDetailsPage();
  initFavouritesPage();
  initProfilePage();
  updateSavedCounts();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#submit-idea-form");
  if (!form) return;

  const helpPanel = document.createElement("aside");
  helpPanel.className = "submit-ai-help";
  helpPanel.innerHTML = `<span class="ai-spark">✦</span><div><strong>Need help?</strong><p>Not sure how to write your startup idea?</p><div class="help-links"><a href="ai-helper.html?prompt=Help%20me%20describe%20the%20problem">Describe the problem</a><a href="ai-helper.html?prompt=Help%20me%20define%20the%20solution">Define the solution</a><a href="ai-helper.html?prompt=Help%20me%20find%20target%20users">Find target users</a><a href="ai-helper.html?prompt=Help%20me%20create%20features">Create features</a></div></div>`;
  form.insertAdjacentElement("beforebegin", helpPanel);

  const params = new URLSearchParams(window.location.search);
  const editingId = params.get("id");
  const editingIdea = editingId ? getUserIdeas().find((idea) => idea.id === editingId && idea.createdBy === getUsername() && (!idea.createdByUserId || idea.createdByUserId === sessionStorage.getItem("userId"))) : null;
  const title = document.querySelector("#submit-page-title");
  const submitButton = document.querySelector("#submit-idea-button");
  const message = document.querySelector("#submit-message");
  const description = document.querySelector("#idea-description");
  const counter = document.querySelector(".field-hint");

  if (editingId && !editingIdea) {
    message.className = "form-message error";
    message.textContent = "That idea is unavailable or you do not have permission to edit it.";
    form.querySelectorAll("input, textarea, select, button[type='submit']").forEach((field) => { field.disabled = true; });
    return;
  }

  if (editingIdea) {
    title.textContent = "Edit Your Startup Idea";
    submitButton.innerHTML = "Update Idea <span>→</span>";
    document.querySelector("#idea-name").value = editingIdea.name;
    document.querySelector("#idea-category").value = editingIdea.category;
    description.value = editingIdea.description;
    document.querySelector("#idea-problem").value = editingIdea.problem;
    document.querySelector("#idea-solution").value = editingIdea.solution;
    document.querySelector("#idea-audience").value = editingIdea.targetAudience;
    document.querySelector("#idea-business-model").value = editingIdea.businessModel;
    document.querySelector("#idea-features").value = editingIdea.features.join("\n");
    document.querySelector("#idea-tags").value = editingIdea.tags.join(", ");
  }

  const updateCounter = () => { counter.textContent = `${description.value.length}/200`; };
  description.addEventListener("input", updateCounter);
  updateCounter();

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      updateCounter();
      message.className = "form-message";
      message.textContent = "";
    }, 0);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fields = {
      name: document.querySelector("#idea-name").value.trim(),
      category: document.querySelector("#idea-category").value,
      description: description.value.trim(),
      problem: document.querySelector("#idea-problem").value.trim(),
      solution: document.querySelector("#idea-solution").value.trim(),
      targetAudience: document.querySelector("#idea-audience").value.trim(),
      businessModel: document.querySelector("#idea-business-model").value,
      features: document.querySelector("#idea-features").value.split("\n").map((item) => item.trim()).filter(Boolean),
      tags: document.querySelector("#idea-tags").value.split(",").map((item) => item.trim()).filter(Boolean)
    };
    const required = [fields.name, fields.category, fields.description, fields.problem, fields.solution, fields.targetAudience, fields.businessModel];
    message.className = "form-message";
    if (required.some((value) => !value)) {
      message.classList.add("error");
      message.textContent = "Complete all required fields before submitting your idea.";
      return;
    }
    if (fields.description.length > 200) {
      message.classList.add("error");
      message.textContent = "Keep the short description within 200 characters.";
      return;
    }

    const userIdeas = getUserIdeas();
    const savedIdea = { id: editingIdea ? editingIdea.id : `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...fields, rating: editingIdea ? editingIdea.rating : 0, date: editingIdea ? editingIdea.date : new Date().toISOString().slice(0, 10), createdBy: getUsername(), createdByUserId: sessionStorage.getItem("userId") || "", isUserSubmitted: true };
    const nextIdeas = editingIdea ? userIdeas.map((idea) => idea.id === editingIdea.id ? savedIdea : idea) : [savedIdea, ...userIdeas];
    saveUserIdeas(nextIdeas);
    message.classList.add("success");
    message.textContent = editingIdea ? "Your startup idea has been updated successfully!" : "Your startup idea has been submitted successfully!";
    sessionStorage.setItem("ideaMessage", message.textContent);
    window.setTimeout(() => { window.location.href = "ideas.html"; }, 700);
  });
});

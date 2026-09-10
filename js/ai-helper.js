const AI_CHAT_KEY = "startupHubAIChat";

function readAIHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem(AI_CHAT_KEY) || "{}");
    return stored && !Array.isArray(stored) && Array.isArray(stored[getUsername()]) ? stored[getUsername()] : [];
  } catch (error) {
    return [];
  }
}

function writeAIHistory(history) {
  let stored = {};
  try { stored = JSON.parse(localStorage.getItem(AI_CHAT_KEY) || "{}"); } catch (error) { stored = {}; }
  if (!stored || Array.isArray(stored)) stored = {};
  stored[getUsername()] = history.slice(-80);
  localStorage.setItem(AI_CHAT_KEY, JSON.stringify(stored));
}

function getIdeaTitle(idea) { return idea ? idea.title || idea.name : "your startup idea"; }
function getIdeaContext() {
  const id = new URLSearchParams(window.location.search).get("ideaId");
  return id ? getIdeaById(id) : null;
}

function escapeAIHtml(value) {
  return String(value || "").replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function generateAIResponse(message, context) {
  const question = message.toLowerCase();
  const ideaName = getIdeaTitle(context);
  const description = context ? context.description : "your current startup concept";
  const audience = context ? context.audience || context.targetAudience : "the specific group with the strongest unmet need";
  if (/improve|better|analy[sz]e|refine/.test(question)) return `IDEA ANALYSIS\n\nCurrent Idea: ${ideaName}\n${description}\n\nProblem\nSharpen the pain into one measurable moment instead of solving a broad category.\n\nTarget Users\nStart with ${audience}. Interview 5-10 people who experience the problem weekly.\n\nUnique Value\nPromise one clear outcome faster, simpler, or more affordably than the current workaround.\n\nImportant Features\n1. A focused MVP workflow\n2. Personalised recommendations\n3. Progress or outcome tracking\n4. Feedback capture\n\nBusiness Model\nTest a free entry point with a paid plan for automation, collaboration, or deeper insights.\n\nCompetitive Advantage\nOwn a narrow audience and build proprietary learning from repeated usage.\n\nNext Step\nWrite a one-sentence value proposition and validate it with 10 target users.`;
  if (/target audience|customers|who will use|target users/.test(question)) return `TARGET AUDIENCE\n\nPrimary users\n${audience}.\n\nSecondary users\nAdjacent teams, partners, or decision-makers who benefit from the user's outcome.\n\nAge group\nChoose the smallest realistic segment first; demographics should follow the problem, not replace it.\n\nUser needs\nA faster, clearer, lower-risk way to reach the desired outcome.\n\nMain pain points\nTime lost to workarounds, fragmented tools, uncertainty, and inconsistent results.\n\nBuying behavior\nLook for communities, search terms, competing tools, and moments when the pain becomes urgent.`;
  if (/business model|how will i earn|revenue/.test(question)) return `BUSINESS MODEL OPTIONS\n\nSubscription\nUseful when customers receive recurring value and need the product every month.\n\nFreemium\nUseful when a free habit can convert engaged users into paid power users.\n\nCommission\nUseful when your platform enables a transaction between two parties.\n\nAdvertising\nUseful only when you can build meaningful attention at scale without harming trust.\n\nPremium features\nKeep the core experience accessible, then charge for automation, analytics, or collaboration.\n\nB2B licensing\nSell predictable access, controls, and reporting to organizations.\n\nMarketplace fees\nTake a transparent percentage when you create a valuable match.`;
  if (/monetiz|make money|pricing|revenue stream/.test(question)) return `MONETIZATION PLAN\n\nBest options\n1. A free starter tier to reduce adoption friction\n2. A $9-$19 monthly individual plan for advanced workflows\n3. A team plan priced per seat for collaboration\n4. Partner or marketplace fees where your product creates a transaction\n\nFree vs premium\nMake the free version useful on its own. Put scale, automation, integrations, and deeper insights behind premium.\n\nRevenue streams\nSubscriptions, team licensing, implementation packages, and carefully chosen partner revenue.\n\nTest next\nAsk early users which outcome they would pay to make more reliable, then pre-sell that outcome before building extras.`;
  if (/feature|functionality/.test(question)) return `FEATURE ROADMAP\n\nMust-have features\n1. Simple onboarding around the core problem\n2. One complete end-to-end workflow\n3. A useful result users can act on\n4. Feedback and progress tracking\n\nNice-to-have features\n1. Personalised recommendations\n2. Collaboration and sharing\n3. Integrations with existing tools\n\nFuture features\n1. Predictive insights\n2. Community or marketplace layers\n3. Advanced reporting and automation\n\nBuild the smallest version that proves users return for the outcome.`;
  if (/name|brand name/.test(question)) return `STARTUP NAME DIRECTIONS\n\n1. Northstar\n2. Brightline\n3. Pivotly\n4. SignalWorks\n5. Looma\n6. Launchwell\n7. Verve\n\nChoose a name that is easy to say, easy to spell, and broad enough for the product to grow. Check domain and trademark availability before committing.`;
  if (/problem|problem statement|pain point/.test(question)) return `PROBLEM DISCOVERY\n\nCurrent problem\nPeople lose time, confidence, or money because the existing workflow is fragmented or difficult to trust.\n\nWho experiences it\nStart with ${audience}.\n\nWhy it matters\nA frequent, expensive, or emotionally frustrating problem creates urgency to change.\n\nExisting alternatives\nManual workarounds, spreadsheets, generic tools, agencies, or simply tolerating the pain.\n\nPossible opportunity\nMake the first valuable outcome dramatically easier to achieve and measure the before-and-after.`;
  if (/risk|challenge|obstacle/.test(question)) return `RISKS AND RESPONSES\n\nMarket risk\nThe problem may not be urgent. Run interviews and a landing-page test before building deeply.\n\nCompetition risk\nA larger product may copy the feature. Win a narrow audience through focus and insight.\n\nTechnical risk\nThe desired experience may depend on complex integrations. Prototype the riskiest dependency first.\n\nFinancial risk\nCosts may grow before revenue. Set a small validation budget and milestone-based decisions.\n\nUser adoption risk\nChanging behavior is hard. Fit the product into an existing routine and show value quickly.`;
  if (/launch|how to start|roadmap/.test(question)) return `LAUNCH ROADMAP\n\n1. Validate the idea with real conversations\n2. Research the alternatives users already choose\n3. Build a narrow MVP\n4. Test it with a small cohort\n5. Collect behavioural feedback\n6. Improve the highest-friction workflow\n7. Launch to a focused community\n8. Measure activation, retention, and willingness to pay\n\nFor ${ideaName}, the next practical move is a small test with people who experience the problem frequently.`;
  return `I CAN HELP YOU THINK THIS THROUGH\n\nI can help with:\n- Startup idea analysis\n- Problem identification\n- Target audience\n- Business model\n- Monetization\n- Features\n- Startup names\n- Launch plans\n- Risks\n\nTell me about your startup idea, or choose a quick prompt to get moving.`;
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function appendMessage(message, role, timestamp, container) {
  const bubble = document.createElement("article");
  bubble.className = `chat-message ${role === "user" ? "user-message" : "ai-message"}`;
  const avatar = document.createElement("span");
  avatar.className = `ai-avatar ${role === "user" ? "user-avatar" : ""}`;
  avatar.textContent = role === "user" ? (getCurrentUser().fullName.charAt(0) || "U") : "✦";
  const body = document.createElement("div");
  body.className = "chat-bubble";
  const text = document.createElement("div");
  text.className = "ai-message-text";
  text.textContent = message;
  const meta = document.createElement("small");
  meta.textContent = `${role === "user" ? "You" : "IDEALAUNCH AI"} · ${formatTimestamp(timestamp)}`;
  body.append(text, meta);
  bubble.append(avatar, body);
  container.appendChild(bubble);
}

function renderHistory(history, container) {
  container.innerHTML = "";
  history.forEach((item) => appendMessage(item.message, item.role, item.timestamp, container));
  container.scrollTop = container.scrollHeight;
}

function saveMessage(role, message) {
  const history = readAIHistory();
  history.push({ role, message, timestamp: new Date().toISOString() });
  writeAIHistory(history);
  return history;
}

function showWelcome(container, context) {
  const welcome = context ? `I’m ready to work on ${getIdeaTitle(context)}. Ask me to improve it, find its risks, or plan the launch.` : "I’m ready to help you turn a rough thought into a sharper startup concept. What are you exploring?";
  appendMessage(welcome, "ai", new Date().toISOString(), container);
}

document.addEventListener("DOMContentLoaded", () => {
  const messages = document.querySelector("#chat-messages");
  if (!messages) return;
  const context = getIdeaContext();
  const contextCard = document.querySelector("#idea-context");
  if (context && contextCard) {
    contextCard.hidden = false;
    contextCard.innerHTML = `<div class="ai-context-icon">✦</div><div><span class="section-label">AI Assistant is ready to help with</span><h2>${escapeAIHtml(getIdeaTitle(context))}</h2><p>${escapeAIHtml(context.category)} · ${escapeAIHtml(context.description)}</p><small>Audience: ${escapeAIHtml(context.audience || context.targetAudience)}</small></div>`;
  }
  const history = readAIHistory();
  if (history.length) renderHistory(history, messages); else showWelcome(messages, context);
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#chat-input");
  const typing = document.querySelector("#typing-indicator");
  const send = (rawMessage) => {
    const message = rawMessage.trim();
    if (!message || typing.hidden === false) return;
    const timestamp = new Date().toISOString();
    appendMessage(message, "user", timestamp, messages);
    saveMessage("user", message);
    input.value = "";
    input.style.height = "auto";
    typing.hidden = false;
    messages.scrollTop = messages.scrollHeight;
    window.setTimeout(() => {
      const response = generateAIResponse(message, context);
      appendMessage(response, "ai", new Date().toISOString(), messages);
      saveMessage("ai", response);
      typing.hidden = true;
      messages.scrollTop = messages.scrollHeight;
    }, 650);
  };
  form.addEventListener("submit", (event) => { event.preventDefault(); send(input.value); });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(input.value); }
  });
  input.addEventListener("input", () => { input.style.height = "auto"; input.style.height = `${Math.min(input.scrollHeight, 140)}px`; });
  document.querySelectorAll("[data-prompt]").forEach((button) => button.addEventListener("click", () => send(button.dataset.prompt)));
  document.querySelector("#clear-chat").addEventListener("click", () => {
    if (!window.confirm("Clear your IDEALAUNCH AI chat history?")) return;
    writeAIHistory([]); messages.innerHTML = ""; showWelcome(messages, context);
  });
  document.querySelector("#new-conversation").addEventListener("click", () => { messages.innerHTML = ""; showWelcome(messages, context); input.focus(); });
  const initialPrompt = new URLSearchParams(window.location.search).get("prompt");
  if (initialPrompt) window.setTimeout(() => send(initialPrompt), 120);
});

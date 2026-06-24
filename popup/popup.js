import { get, set, getApiKey, getKeywords, getPlatforms, getDelay } from "../utils/storage.js";
import { PLATFORMS } from "../utils/platforms.js";

// --- State ---
let state = {
  keywords: [],
  platforms: PLATFORMS.map(p => p.id),
  delayMs: 400
};

// --- DOM ---
const keywordTextarea = document.getElementById("keywordTextarea");
const platformGrid = document.getElementById("platformGrid");
const toggleAllBtn = document.getElementById("toggleAllBtn");
const generateBtn = document.getElementById("generateBtn");
const searchBtn = document.getElementById("searchBtn");
const settingsBtn = document.getElementById("settingsBtn");
const statusBar = document.getElementById("statusBar");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const messageBar = document.getElementById("messageBar");

// --- Init ---
async function init() {
  const data = await get(["lastKeywords", "defaultPlatforms", "searchDelayMs"]);
  state.keywords = data.lastKeywords || [];
  state.platforms = data.defaultPlatforms || PLATFORMS.map(p => p.id);
  state.delayMs = data.searchDelayMs || 400;

  renderPlatforms();
  renderKeywords();
  updateStatus();
}

function renderPlatforms() {
  const col1 = PLATFORMS.slice(0, 4);
  const col2 = PLATFORMS.slice(4);

  platformGrid.innerHTML = "";
  const maxLen = Math.max(col1.length, col2.length);
  for (let i = 0; i < maxLen; i++) {
    [col1[i], col2[i]].filter(Boolean).forEach(p => {
      const label = document.createElement("label");
      label.className = "platform-checkbox";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = p.id;
      cb.checked = state.platforms.includes(p.id);
      cb.addEventListener("change", onPlatformChange);
      label.appendChild(cb);
      label.appendChild(document.createTextNode(p.name));
      platformGrid.appendChild(label);
    });
  }
}

function renderKeywords() {
  keywordTextarea.value = state.keywords.join("\n");
}

function updateStatus() {
  const count = getKeywordList().length;
  if (count > 0) {
    statusBar.textContent = `已生成 ${count} 个关键词`;
  } else {
    statusBar.textContent = "尚未生成关键词";
  }
  searchBtn.disabled = count === 0 || getSelectedPlatforms().length === 0;
}

function getKeywordList() {
  return keywordTextarea.value
    .split("\n")
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function getSelectedPlatforms() {
  return [...platformGrid.querySelectorAll("input:checked")].map(cb => cb.value);
}

function showMessage(text, type) {
  messageBar.textContent = text;
  messageBar.className = `message ${type}`;
  messageBar.classList.remove("hidden");
  setTimeout(() => messageBar.classList.add("hidden"), 4000);
}

function setProgress(current, total) {
  progressBar.classList.remove("hidden");
  progressText.textContent = `正在搜索 第 ${current}/${total} 次...`;
  progressFill.style.width = `${(current / total) * 100}%`;
}

function hideProgress() {
  progressBar.classList.add("hidden");
}

// --- Events ---
function onPlatformChange() {
  state.platforms = getSelectedPlatforms();
  set({ defaultPlatforms: state.platforms });
  updateStatus();
}

toggleAllBtn.addEventListener("click", () => {
  const cbs = platformGrid.querySelectorAll("input");
  const allChecked = [...cbs].every(cb => cb.checked);
  cbs.forEach(cb => { cb.checked = !allChecked; });
  state.platforms = getSelectedPlatforms();
  set({ defaultPlatforms: state.platforms });
  updateStatus();
});

keywordTextarea.addEventListener("input", () => {
  state.keywords = getKeywordList();
  set({ lastKeywords: state.keywords });
  updateStatus();
});

settingsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

generateBtn.addEventListener("click", async () => {
  generateBtn.disabled = true;
  generateBtn.textContent = "生成中...";
  showMessage("正在调用 DeepSeek API 生成关键词...", "info");

  try {
    const apiKey = await getApiKey();

    if (!apiKey) {
      // Use fallback
      const data = await get(["keywordCount", "wordLengths"]);
      const count = data.keywordCount || 100;
      const wordLengths = data.wordLengths || [1,2,3,4,5,6];
      const { getFallbackKeywords } = await import(chrome.runtime.getURL("utils/keywords.js"));
      state.keywords = getFallbackKeywords(count, wordLengths);
      keywordTextarea.value = state.keywords.join("\n");
      set({ lastKeywords: state.keywords });
      updateStatus();
      showMessage(`未配置 API Key，已使用内置关键词列表（${state.keywords.length} 个）`, "info");
    } else {
      // Call via service worker
      const response = await chrome.runtime.sendMessage({ action: "generateKeywords" });
      if (response.error) {
        throw new Error(response.error);
      }
      state.keywords = response.keywords;
      keywordTextarea.value = state.keywords.join("\n");
      set({ lastKeywords: state.keywords });
      updateStatus();
      showMessage(`成功生成 ${state.keywords.length} 个关键词`, "success");
    }
  } catch (e) {
    showMessage(e.message || "生成失败", "error");
    const data = await get(["keywordCount", "wordLengths"]);
    const count = data.keywordCount || 100;
    const wordLengths = data.wordLengths || [1,2,3,4,5,6];
    const { getFallbackKeywords } = await import(chrome.runtime.getURL("utils/keywords.js"));
    state.keywords = getFallbackKeywords(count, wordLengths);
    keywordTextarea.value = state.keywords.join("\n");
    set({ lastKeywords: state.keywords });
    updateStatus();
  }

  generateBtn.disabled = false;
  generateBtn.textContent = "生成关键词";
});

searchBtn.addEventListener("click", async () => {
  const keywords = getKeywordList();
  const platforms = getSelectedPlatforms();

  if (keywords.length === 0) {
    showMessage("请先生成或输入关键词", "error");
    return;
  }
  if (platforms.length === 0) {
    showMessage("请至少选择一个搜索平台", "error");
    return;
  }

  searchBtn.disabled = true;
  generateBtn.disabled = true;

  try {
    const response = await chrome.runtime.sendMessage({
      action: "startSearch",
      keywords,
      platforms
    });

    if (response.error) {
      showMessage(response.error, "error");
    } else {
      showMessage(`完成！共搜索 ${response.opened + response.failed} 次`, "success");
    }
  } catch (e) {
    showMessage("搜索请求失败", "error");
  }

  hideProgress();
  searchBtn.disabled = false;
  generateBtn.disabled = false;
  updateStatus();
});

// Listen for progress from service worker
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "searchProgress") {
    setProgress(msg.current, msg.total);
  }
  if (msg.action === "searchComplete") {
    hideProgress();
  }
});

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Start ---
init();

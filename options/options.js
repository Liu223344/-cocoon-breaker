import { get, set } from "../utils/storage.js";
import { PLATFORMS } from "../utils/platforms.js";

const apiKeyInput = document.getElementById("apiKey");
const toggleKeyBtn = document.getElementById("toggleKeyBtn");
const keyStatus = document.getElementById("keyStatus");
const modelSelect = document.getElementById("modelSelect");
const modelCustom = document.getElementById("modelCustom");
const platformGrid = document.getElementById("platformGrid");
const selectAllBtn = document.getElementById("selectAllBtn");
const deselectAllBtn = document.getElementById("deselectAllBtn");
const delayRange = document.getElementById("delayRange");
const delayValue = document.getElementById("delayValue");
const countCustom = document.getElementById("countCustom");
const autoPlayToggle = document.getElementById("autoPlayToggle");
const watchSettings = document.getElementById("watchSettings");
const watchSeconds = document.getElementById("watchSeconds");
const watchValue = document.getElementById("watchValue");
const saveBtn = document.getElementById("saveBtn");
const toast = document.getElementById("toast");

async function init() {
  const data = await get(["apiKey", "defaultPlatforms", "searchDelayMs", "modelName", "keywordCount", "autoPlay", "watchSeconds", "wordLengths"]);

  apiKeyInput.value = data.apiKey || "";
  updateKeyStatus();

  // Model
  const model = data.modelName || "deepseek-chat";
  const preset = [...modelSelect.options].find(o => o.value === model);
  if (preset) {
    modelSelect.value = model;
    modelCustom.style.display = "none";
  } else {
    modelSelect.value = "__custom__";
    modelCustom.style.display = "block";
    modelCustom.value = model;
  }

  const platforms = data.defaultPlatforms || PLATFORMS.map(p => p.id);
  renderPlatforms(platforms);

  delayRange.value = data.searchDelayMs || 400;
  delayValue.textContent = delayRange.value;

  autoPlayToggle.checked = data.autoPlay || false;
  watchSeconds.value = data.watchSeconds || 30;
  watchValue.textContent = watchSeconds.value;
  watchSettings.style.display = autoPlayToggle.checked ? "block" : "none";

  // Keyword count
  countCustom.value = data.keywordCount || 100;

  // Word lengths
  const lengths = data.wordLengths || [1,2,3,4,5,6];
  document.querySelectorAll(".length-check input").forEach(cb => {
    cb.checked = lengths.includes(parseInt(cb.value));
  });
}

function updateKeyStatus() {
  if (apiKeyInput.value.trim()) {
    keyStatus.textContent = "已配置";
    keyStatus.className = "status configured";
  } else {
    keyStatus.textContent = "未配置（将使用内置关键词）";
    keyStatus.className = "status unconfigured";
  }
}

function renderPlatforms(selectedIds) {
  platformGrid.innerHTML = "";
  PLATFORMS.forEach(p => {
    const label = document.createElement("label");
    label.className = "platform-checkbox";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = p.id;
    cb.checked = selectedIds.includes(p.id);
    label.appendChild(cb);
    label.appendChild(document.createTextNode(p.name));
    platformGrid.appendChild(label);
  });
}

function getSelectedPlatforms() {
  return [...platformGrid.querySelectorAll("input:checked")].map(cb => cb.value);
}

function getModel() {
  if (modelSelect.value === "__custom__") {
    return modelCustom.value.trim() || "deepseek-chat";
  }
  return modelSelect.value;
}

function getKeywordCount() {
  const val = parseInt(countCustom.value);
  return (val >= 5 && val <= 200) ? val : 100;
}

modelSelect.addEventListener("change", () => {
  if (modelSelect.value === "__custom__") {
    modelCustom.style.display = "block";
  } else {
    modelCustom.style.display = "none";
  }
});

apiKeyInput.addEventListener("input", updateKeyStatus);

toggleKeyBtn.addEventListener("click", () => {
  apiKeyInput.type = apiKeyInput.type === "password" ? "text" : "password";
  toggleKeyBtn.textContent = apiKeyInput.type === "password" ? "👁" : "🙈";
});

selectAllBtn.addEventListener("click", () => {
  platformGrid.querySelectorAll("input").forEach(cb => { cb.checked = true; });
});
deselectAllBtn.addEventListener("click", () => {
  platformGrid.querySelectorAll("input").forEach(cb => { cb.checked = false; });
});

autoPlayToggle.addEventListener("change", () => {
  watchSettings.style.display = autoPlayToggle.checked ? "block" : "none";
});

watchSeconds.addEventListener("input", () => {
  watchValue.textContent = watchSeconds.value;
});

delayRange.addEventListener("input", () => {
  delayValue.textContent = delayRange.value;
});

saveBtn.addEventListener("click", async () => {
  await set({
    apiKey: apiKeyInput.value.trim(),
    modelName: getModel(),
    defaultPlatforms: getSelectedPlatforms(),
    searchDelayMs: parseInt(delayRange.value),
    keywordCount: getKeywordCount(),
    autoPlay: autoPlayToggle.checked,
    watchSeconds: parseInt(watchSeconds.value),
    wordLengths: [...document.querySelectorAll(".length-check input:checked")].map(cb => parseInt(cb.value))
  });
  showToast("设置已保存");
});

function showToast(msg) {
  toast.textContent = msg;
  toast.className = "toast success";
  setTimeout(() => { toast.className = "toast hidden"; }, 2000);
}

init();

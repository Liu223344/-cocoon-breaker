const DEFAULTS = {
  apiKey: "",
  modelName: "deepseek-chat",
  lastKeywords: [],
  defaultPlatforms: ["bilibili", "douyin", "xiaohongshu", "zhihu", "weibo", "baidu", "toutiao"],
  searchDelayMs: 400,
  keywordCount: 100,
  autoPlay: false,
  watchSeconds: 30
};

export async function get(keys) {
  const result = await chrome.storage.local.get(keys);
  const output = {};
  for (const key of keys) {
    output[key] = result[key] !== undefined ? result[key] : DEFAULTS[key];
  }
  return output;
}

export async function set(obj) {
  return chrome.storage.local.set(obj);
}

export async function getApiKey() {
  const result = await chrome.storage.local.get("apiKey");
  return result.apiKey || "";
}

export async function getKeywords() {
  const result = await chrome.storage.local.get("lastKeywords");
  return result.lastKeywords || [];
}

export async function getPlatforms() {
  const result = await chrome.storage.local.get("defaultPlatforms");
  return result.defaultPlatforms || DEFAULTS.defaultPlatforms;
}

export async function getDelay() {
  const result = await chrome.storage.local.get("searchDelayMs");
  return result.searchDelayMs || DEFAULTS.searchDelayMs;
}

export async function getModelName() {
  const result = await chrome.storage.local.get("modelName");
  return result.modelName || DEFAULTS.modelName;
}

export async function getKeywordCount() {
  const result = await chrome.storage.local.get("keywordCount");
  return result.keywordCount || DEFAULTS.keywordCount;
}

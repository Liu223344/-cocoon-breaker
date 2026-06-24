import { generateKeywords, getFallbackKeywords } from "../utils/keywords.js";
import { executeReuseTabs } from "../utils/search.js";
import { get, getApiKey, getDelay, getModelName, getKeywordCount, getWordLengths } from "../utils/storage.js";

let searchAborted = false;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "generateKeywords") {
    handleGenerate(msg.count, sendResponse);
    return true; // async
  }

  if (msg.action === "startSearch") {
    handleSearch(msg.keywords, msg.platforms, sendResponse);
    return true; // async
  }

  if (msg.action === "stopSearch") {
    searchAborted = true;
    sendResponse({ ok: true });
    return false;
  }
});

async function handleGenerate(popupCount, sendResponse) {
  try {
    const apiKey = await getApiKey();
    const modelName = await getModelName();
    const count = popupCount || await getKeywordCount();
    const wordLengths = await getWordLengths();

    if (!apiKey) {
      sendResponse({ keywords: getFallbackKeywords(count, wordLengths) });
      return;
    }
    const keywords = await generateKeywords(apiKey, modelName, count, wordLengths);
    sendResponse({ keywords });
  } catch (e) {
    const count = await getKeywordCount();
    const wordLengths = await getWordLengths();
    sendResponse({ error: e.message, keywords: getFallbackKeywords(count, wordLengths) });
  }
}

async function handleSearch(keywords, platforms, sendResponse) {
  searchAborted = false;

  const data = await get(["searchDelayMs", "autoPlay", "watchSeconds"]);
  const delayMs = data.searchDelayMs || 400;
  const autoPlay = data.autoPlay || false;
  const watchSeconds = data.watchSeconds || 30;

  const results = await executeReuseTabs(keywords, platforms, delayMs, (progress) => {
    if (searchAborted) return;
    chrome.runtime.sendMessage({
      action: "searchProgress",
      ...progress
    }).catch(() => {});
  }, autoPlay, watchSeconds);

  chrome.runtime.sendMessage({ action: "searchComplete" }).catch(() => {});
  sendResponse({ opened: results.opened, failed: results.failed });
}

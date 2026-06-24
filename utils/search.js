import { buildUrl } from "./platforms.js";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function injectAutoClick(tabId) {
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["utils/content-script.js"]
    });
  } catch {
    // ignore errors (e.g. restricted pages like chrome://)
  }
}

export async function executeReuseTabs(keywords, platformIds, delayMs, onProgress, autoPlay = false, watchSeconds = 30) {
  const shuffledKw = shuffle([...keywords]);

  const pairs = [];
  for (const kw of shuffledKw) {
    for (const pid of platformIds) {
      pairs.push({ keyword: kw, platform: pid, url: buildUrl(pid, kw) });
    }
  }
  const shuffled = shuffle(pairs);
  const total = shuffled.length;
  const results = { opened: 0, failed: 0, total };
  let tabId = null;

  for (let i = 0; i < shuffled.length; i++) {
    const item = shuffled[i];

    // Close previous tab
    if (tabId !== null) {
      try { await chrome.tabs.remove(tabId); } catch { /* already closed */ }
      tabId = null;
    }

    await sleep(150);

    // Open new tab
    try {
      const tab = await chrome.tabs.create({ url: item.url, active: false });
      tabId = tab.id;
      results.opened++;

      // Auto-play: wait for page load, inject click script, wait watch time
      if (autoPlay && tabId) {
        await sleep(3000); // wait for page to load
        await injectAutoClick(tabId);
        await sleep(watchSeconds * 1000); // let user watch
      }
    } catch {
      results.failed++;
    }

    onProgress?.({ current: i + 1, total, keyword: item.keyword, platform: item.platform });

    if (i < shuffled.length - 1) {
      // In autoPlay mode, the watch time IS the delay. Otherwise use normal delay.
      await sleep(autoPlay ? 200 : delayMs);
    }
  }

  return results;
}

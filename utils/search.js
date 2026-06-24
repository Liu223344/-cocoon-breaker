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

async function extractFirstResultUrl(tabId) {
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: () => {
        const SELECTORS = [
          'a[href*="//www.bilibili.com/video/"]',
          '.bili-video-card a', '.bili-video-card__wrap a',
          '.video-list-item a', '.search-video-item a',
          '.search-result-card a', '.note-item a',
          '.List-item .ContentItem-title a',
          '.card-wrap a[href*="weibo.com"]',
          '#content_left a[href]',
          '.feed-card a'
        ];
        for (const sel of SELECTORS) {
          try {
            const el = document.querySelector(sel);
            if (el && el.href && !el.href.startsWith('javascript:') && el.offsetParent !== null) {
              return el.href;
            }
          } catch { /* next */ }
        }
        return null;
      }
    });
    return results[0]?.result || null;
  } catch {
    return null;
  }
}

export async function executeSearch(keywords, platformIds, delayMs, onProgress, autoPlay = false, watchSeconds = 30) {
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

  for (let i = 0; i < shuffled.length; i++) {
    const item = shuffled[i];

    try {
      const tab = await chrome.tabs.create({ url: item.url, active: autoPlay });
      results.opened++;

      if (autoPlay) {
        await sleep(6000);
        const videoUrl = await extractFirstResultUrl(tab.id);
        if (videoUrl) {
          await chrome.tabs.update(tab.id, { url: videoUrl });
        }
        await sleep(watchSeconds * 1000);
        // keep tab open for user to watch later
      }
    } catch {
      results.failed++;
    }

    onProgress?.({ current: i + 1, total, keyword: item.keyword, platform: item.platform });

    if (!autoPlay && i < shuffled.length - 1) {
      await sleep(delayMs);
    }
  }

  return results;
}

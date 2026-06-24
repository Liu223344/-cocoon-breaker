// Injected into search result pages to auto-click the first result
(function () {
  const SELECTORS = [
    // B站
    'a[href*="//www.bilibili.com/video/"]',
    '.bili-video-card a',
    '.bili-video-card__wrap',
    '.video-list-item a',
    '.search-video-item a',
    // 抖音
    '.search-result-card a',
    '[data-e2e="search-result"] a',
    // 小红书
    '.note-item a',
    '.feeds-page a[href*="explore"]',
    // 知乎
    '.List-item .ContentItem-title a',
    '.SearchResult-Card a',
    // 微博
    '.card-wrap a[href*="weibo.com"]',
    // 百度
    '#content_left a',
    '.result a[href]',
    // 头条
    '.feed-card a',
    '[class*="article-card"] a',
    // 通用兜底
    '[class*="search"] a[href]',
    '[class*="result"] a[href]'
  ];

  function tryClick() {
    for (const sel of SELECTORS) {
      try {
        const el = document.querySelector(sel);
        if (el && el.href && !el.href.startsWith('javascript:') && el.offsetParent !== null) {
          el.click();
          return true;
        }
      } catch { /* next */ }
    }
    return false;
  }

  // Poll until results render (retry every 500ms, up to 20 attempts = 10s)
  let attempts = 0;
  const poll = setInterval(() => {
    attempts++;
    if (tryClick() || attempts >= 20) {
      clearInterval(poll);
    }
  }, 500);
})();

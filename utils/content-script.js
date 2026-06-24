// Injected into search result pages to auto-click the first result
(function () {
  const SELECTORS = [
    // B站
    '.bili-video-card a', '.bili-video-card__wrap', '.video-list-item a',
    '.search-video-item a', '.video-list a[href*="video"]',
    // 抖音
    '.search-result-card a', '[data-e2e="search-result"] a',
    // 小红书
    '.note-item a', '.feeds-page a[href*="explore"]',
    // 知乎
    '.List-item .ContentItem-title a', '.SearchResult-Card a',
    // 微博
    '.card-wrap a[href*="weibo.com"]', '.card-feed a[href*="status"]',
    // 百度
    '.result a[href*="baidu.com"]', '#content_left a',
    // 头条
    '.feed-card a', '.article-card a', '.BUC-card a',
    // 通用兜底：找搜索区域内的第一个大链接
    '[class*="search"] a[href]', '[class*="result"] a[href]'
  ];

  function clickFirst() {
    for (const sel of SELECTORS) {
      try {
        const el = document.querySelector(sel);
        if (el && el.href && !el.href.startsWith('javascript:')) {
          el.click();
          return true;
        }
      } catch { /* try next selector */ }
    }
    return false;
  }

  if (document.readyState === 'complete') {
    setTimeout(clickFirst, 2000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(clickFirst, 2000);
    });
  }
})();

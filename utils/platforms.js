const PLATFORMS = [
  { id: "bilibili",    name: "B站",    urlTemplate: "https://search.bilibili.com/all?keyword={q}",       color: "#fb7299" },
  { id: "douyin",      name: "抖音",   urlTemplate: "https://www.douyin.com/search/{q}",                  color: "#111111" },
  { id: "xiaohongshu", name: "小红书", urlTemplate: "https://www.xiaohongshu.com/search_result?keyword={q}", color: "#ff2442" },
  { id: "zhihu",       name: "知乎",   urlTemplate: "https://www.zhihu.com/search?type=content&q={q}",    color: "#0084ff" },
  { id: "weibo",       name: "微博",   urlTemplate: "https://s.weibo.com/weibo?q={q}",                    color: "#e6162d" },
  { id: "baidu",       name: "百度",   urlTemplate: "https://www.baidu.com/s?wd={q}",                     color: "#2932e1" },
  { id: "toutiao",     name: "头条",   urlTemplate: "https://www.toutiao.com/search/?keyword={q}",        color: "#ed4040" }
];

export function buildUrl(platformId, keyword) {
  const platform = PLATFORMS.find(p => p.id === platformId);
  if (!platform) throw new Error(`Unknown platform: ${platformId}`);
  return platform.urlTemplate.replace("{q}", encodeURIComponent(keyword));
}

export function getPlatform(platformId) {
  return PLATFORMS.find(p => p.id === platformId);
}

export { PLATFORMS };

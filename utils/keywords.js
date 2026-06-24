const FALLBACK_KEYWORDS = [
  // 自然科学（物理、化学、生物）
  "量子纠缠实验", "超导材料研究", "暗物质探测", "元素周期表趣谈", "粒子对撞机",
  "基因编辑技术", "蛋白质折叠", "细胞自噬机制", "光合作用原理", "深海微生物",
  "催化反应机理", "晶体结构美学", "稀土元素应用", "纳米材料制备", "等离子体物理",
  // 历史与考古
  "古埃及金字塔建造", "维京人航海史", "三星堆文明之谜", "玛雅文字破译", "丝绸之路贸易",
  "中世纪城堡防御", "古希腊民主制度", "殷墟甲骨文", "文艺复兴起源", "罗马军团战术",
  "敦煌藏经洞", "拜占庭帝国兴衰", "郑和下西洋", "波斯帝国文化", "哥伦布大交换",
  // 哲学与伦理学
  "尼采超人哲学", "庄子逍遥游", "斯多葛主义实践", "存在主义入门", "禅宗公案故事",
  "功利主义批判", "康德的道德律", "墨子兼爱非攻", "亚里士多德伦理学", "虚无主义解读",
  // 艺术
  "印象派光影技法", "浮世绘版画工艺", "敦煌壁画修复", "哥特式建筑特征", "巴洛克音乐风格",
  "宋代山水画意境", "古罗马雕塑技艺", "伊斯兰几何纹样", "新艺术运动设计", "西藏唐卡绘制",
  // 音乐理论与流派
  "巴赫赋格曲结构", "爵士即兴演奏", "古琴减字谱", "非洲鼓乐节奏", "电子音乐合成器",
  "印度拉格音阶", "蒙古呼麦唱法", "布鲁斯音阶原理", "日本雅乐传统",
  // 体育
  "自由潜水训练", "攀岩技术要领", "太极拳力学原理", "马术盛装舞步", "击剑步法战术",
  "围棋定式大全", "冲浪物理原理", "射箭传统弓道", "冰壶战术策略",
  // 美食与烹饪
  "地中海饮食文化", "发酵食品科学", "法式甜点制作", "日本怀石料理", "四川泡菜工艺",
  "咖啡烘焙曲线", "巧克力调温技术", "印度香料搭配", "分子料理入门",
  // 旅行与地理
  "喀斯特地貌形成", "北极光观测指南", "茶马古道徒步", "冰岛火山地貌", "撒哈拉星空摄影",
  "热带雨林生态", "喜马拉雅地质", "东非大裂谷探索",
  // 前沿科技
  "区块链共识机制", "量子计算机原理", "脑机接口进展", "可控核聚变", "人工光合作用",
  "自动驾驶伦理", "边缘计算架构", "6G通信技术", "太空太阳能电站",
  // 文学与诗歌
  "俳句创作技法", "魔幻现实主义", "唐宋词牌格律", "意识流写作手法", "史诗叙事结构",
  "日本物哀美学", "但丁神曲解读", "现代诗意象运用",
  // 心理学与认知科学
  "认知偏差类型", "依恋理论解析", "正念冥想研究", "梦的解析方法", "从众心理实验",
  "习得性无助理论", "心流体验条件", "MBTI类型批判",
  // 经济学与社会学
  "博弈论经典案例", "行为经济学", "基尼系数解读", "共享经济模式", "人口老龄化对策",
  "货币起源历史", "社会网络分析", "城市化进程比较",
  // 建筑与城市规划
  "被动式节能建筑", "园林借景手法", "高迪建筑风格", "日式茶室设计", "海绵城市理念",
  "哥特教堂拱顶", "土楼建筑智慧", "参数化建筑设计",
  // 天文学与宇宙学
  "黑洞热力学", "系外行星探测", "超新星爆发机制", "银河系结构图", "引力波探测原理",
  "日冕高温之谜", "木星大红斑", "暗能量假说",
  // 生态与环境科学
  "珊瑚白化原因", "碳循环过程", "生物多样性热点", "湿地生态系统", "垂直农场技术",
  "海洋塑料污染", "森林碳汇计算", "蜜蜂种群危机",
  // 语言学与文字
  "世界语语法结构", "楔形文字解读", "方言保护运动", "手语语言学", "语音演变规律",
  "表意文字对比", "克里奥尔语形成", "濒危语言记录",
  // 电影理论与流派
  "长镜头美学", "法国新浪潮", "蒙太奇理论", "纪录片伦理", "黑色电影特征",
  "动画分镜技巧", "实验电影流派", "电影配乐分析",
  // 工业设计
  "包豪斯设计理念", "人体工学椅子", "极简主义产品", "仿生设计应用", "可持续材料设计",
  "日本民艺运动", "交互设计原则", "汽车空气动力学",
  // 传统医学与健康
  "经络理论现代研究", "阿育吠陀医学", "针灸作用机制", "草本植物药性", "睡眠周期优化",
  "肠道菌群健康", "太极养生功法", "芳香疗法原理",
  // 农业与园艺
  "永续农业设计", "无土栽培技术", "古老谷物品种", "盆景造型技法", "土壤微生物群落",
  "种子库保护", "生态农业实践", "都市农场设计",
  // 海洋科学
  "深海热泉生态", "洋流循环系统", "鲸类迁徙路线", "红树林生态系统", "海洋酸化影响",
  "潮汐能发电", "极地冰盖融化", "珊瑚礁鱼群",
  // 地质学
  "板块构造学说", "火山喷发类型", "矿物晶体鉴赏", "化石形成过程", "地震波传播原理",
  "地幔对流假说", "冰河时代周期", "宝石鉴定入门",
  // 宗教与神话
  "北欧神话体系", "印度教三相神", "希腊创世神话", "禅宗公案解读", "萨满教仪式",
  "日本神道教", "埃及亡灵书", "凯尔特神话传说",
  // 人类学
  "狩猎采集社会", "原始部落仪式", "文化相对主义", "人类迁徙路线", "婚姻制度演变",
  "语言起源假说", "图腾崇拜研究", "礼物交换理论"
];

function buildPrompt(count, wordLengths) {
  const hasLenFilter = wordLengths && wordLengths.length < 6;
  const lenDesc = hasLenFilter
    ? `只允许${wordLengths.join('、')}个字的关键词，其他字数的不要` : '';
  // Request more when length filter is active (some will be filtered out)
  const requestCount = hasLenFilter ? count * 3 : count;
  return `请随机生成${requestCount}个搜索关键词。

要求：
1. ${lenDesc || '关键词长度在1-10个汉字之间，长短随机变化，不要全部一样长'}
2. 每个关键词之间没有任何关联，不要属于同一个领域，越随机越零散越好
3. 每个关键词单独一行，不要编号，不要分类，纯关键词列表
4. 不要输出任何解释、前言或结语，直接输出关键词列表`;
}

function parseKeywords(rawText, maxCount, wordLengths) {
  if (!rawText || typeof rawText !== "string") return [];
  let lines = rawText
    .split("\n")
    .map(line => line.trim())
    .filter(line => {
      if (line.length < 1) return false;
      if (line.length > 15) return false;
      if (/^[\d\.\)、\s\-\*#]+/.test(line)) return false;
      return true;
    })
    .filter((line, i, arr) => arr.indexOf(line) === i);

  // Filter by selected word lengths (if any subset is selected)
  if (wordLengths && wordLengths.length < 6) {
    lines = lines.filter(line => wordLengths.includes(line.length));
  }

  return lines.slice(0, maxCount);
}

export async function generateKeywords(apiKey, modelName = "deepseek-chat", count = 100, wordLengths = null) {
  if (!apiKey) {
    return getFallbackKeywords(count, wordLengths);
  }

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: [{ role: "user", content: buildPrompt(count, wordLengths) }],
      temperature: 1.5,
      max_tokens: Math.max(count * 30, 2000)
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let message;
    if (response.status === 401) {
      message = "API密钥无效，请检查设置";
    } else if (response.status === 429) {
      message = "API请求过于频繁，请稍后再试";
    } else if (response.status === 402) {
      message = "API账户余额不足";
    } else {
      message = `API请求失败 (${response.status})`;
    }
    throw new Error(message);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error("API返回了空内容");
  }

  const keywords = parseKeywords(rawText, count, wordLengths);
  return keywords;
}

export function getFallbackKeywords(count = 100, wordLengths = null) {
  let pool = [...FALLBACK_KEYWORDS];
  if (wordLengths && wordLengths.length < 6) {
    pool = pool.filter(line => wordLengths.includes(line.length));
  }
  return shuffleArray(pool).slice(0, count);
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export { FALLBACK_KEYWORDS };

export interface Question {
  id: number;
  dimension: 'chain' | 'risk' | 'decision' | 'habit';
  question: string;
  options: Option[];
}

export interface Option {
  label: string;
  value: string;
  score: number;
}

export interface Result {
  chain: 'E' | 'S' | 'B' | 'T';
  risk: 'D' | 'H';
  decision: 'R' | 'F';
  habit: 'N' | 'C';
  title: string;
  description: string;
  tagline: string;
  advice: string;
  imageIndex: number;
}

export interface ChainInfo {
  name: string;
  fullName: string;
  description: string;
}

export const CHAIN_INFO: Record<string, ChainInfo> = {
  E: {
    name: 'EVM',
    fullName: 'Ethereum',
    description: '以太坊精英',
  },
  S: {
    name: 'Solana',
    fullName: 'Solana',
    description: '极速信徒',
  },
  B: {
    name: 'Bitcoin',
    fullName: '比特币',
    description: '数字黄金',
  },
  T: {
    name: 'Tron',
    fullName: '波场',
    description: '实用主义',
  },
};

export const PROFILES: Record<string, { title: string; description: string }> = {
  'E-H-R-N': {
    title: 'E卫兵',
    description: '硬核原住民，只在链上操作，研究深度极高，长期持有蓝筹协议。',
  },
  'E-H-R-C': {
    title: '合规官',
    description: '相信以太坊基本面，由于安全考虑资产存放在 CEX，看重研报。',
  },
  'E-H-F-N': {
    title: 'NFT 收藏家',
    description: '早期蓝筹 NFT 的 Diamond Hands，靠社区共识和审美持币。',
  },
  'E-H-F-C': {
    title: 'L2 信仰者',
    description: '看好以太坊生态未来，但在交易所买入后就不再动弹的"养老"用户。',
  },
  'E-D-R-N': {
    title: '复利收割机',
    description: '职业农民（Yield Farmer），在各种复杂协议间套利，研究代码漏洞。',
  },
  'E-D-R-C': {
    title: '打新专业户',
    description: '专门在交易所寻找优质 EVM 项目进行短线波段，看重机构背书。',
  },
  'E-D-F-N': {
    title: '链上领航员',
    description: '热衷于在链上寻找新的 Alpha，跟着社区情绪快速切入热门 L2。',
  },
  'E-D-F-C': {
    title: 'OG投机客',
    description: '在 CEX 里高杠杆交易以太坊系小币种，纯看盘面和情绪。',
  },
  'S-H-R-N': {
    title: '生态奠基人',
    description: '长期看好 Solana 性能，深度参与节点质押，研究并行计算等技术。',
  },
  'S-H-R-C': {
    title: '高性能信徒',
    description: '认同 SOL 的技术价值，但在 CEX 进行定投，不习惯管理私钥。',
  },
  'S-H-F-N': {
    title: '社区精神领袖',
    description: '长期持有 Solana 生态的核心 Meme，是链上活跃的社区大使。',
  },
  'S-H-F-C': {
    title: 'SOL 大户',
    description: '"SOL 必超 ETH"，单纯在交易所里囤货的稳健派。',
  },
  'S-D-R-N': {
    title: '科学家 / 夹子',
    description: '编写脚本在链上抢开盘，通过数据分析进行高频交易的专业选手。',
  },
  'S-D-R-C': {
    title: '波段交易员',
    description: '针对 Solana 生态币种在交易所做日内交易，极其看重盘口数据。',
  },
  'S-D-F-N': {
    title: 'Pump.fun 赌神',
    description: '在链上冲最土的狗，只信情绪，快进快出，Phantom 钱包重度使用者。',
  },
  'S-D-F-C': {
    title: '闪电投机者',
    description: '哪里有热度就去交易所冲哪里的 SOL 系代币，全凭直觉，不看逻辑。',
  },
  'B-H-R-N': {
    title: '中本聪传人',
    description: '极致的比特币原教旨主义者，硬件钱包冷存储，只看宏观模型。',
  },
  'B-H-R-C': {
    title: '机构追随者',
    description: '通过��易所或 ETF 长期持有大饼，定期阅读行业深度研究报告。',
  },
  'B-H-F-N': {
    title: '铭文守望者',
    description: '长期持有 Ordinals 或早期铭文，相信比特币生态的文化共识。',
  },
  'B-H-F-C': {
    title: '大饼养老族',
    description: '不懂技术也不看行情，只知道"大饼是好东西"，买完就存交易所。',
  },
  'B-D-R-N': {
    title: '生态掘金者',
    description: '在比特币 L2 或协议（如 Runes）里寻找技术套利机会的冒险家。',
  },
  'B-D-R-C': {
    title: '杠杆套利员',
    description: '在交易所利用大饼的波动做高杠杆对冲或套利，极其理智。',
  },
  'B-D-F-N': {
    title: '铭文投机客',
    description: '疯狂在链上打各种新协议的铭文，全看社区喊单力度。',
  },
  'B-D-F-C': {
    title: '减半博弈者',
    description: '赌大饼波动，喜欢在重要节点通过期权、合约博取暴利。',
  },
  'T-H-R-N': {
    title: '链上金库守卫',
    description: '熟练使用 Tron 钱包，研究波场质押收益，长期持有并管理资产。',
  },
  'T-H-R-C': {
    title: 'TRX 价值投资者',
    description: '在 CEX 长期持有 TRX 或关联代币，看重波场生态的盈利能力。',
  },
  'T-H-F-N': {
    title: '波场老玩家',
    description: '活跃在波场早期的 DApp 中，对孙哥的生态有种莫名的"情怀"。',
  },
  'T-H-F-C': {
    title: '稳定币搬运工',
    description: '把波场当成 U 存储器，在交易所长期存放 USDT，追求极致稳定。',
  },
  'T-D-R-N': {
    title: '智能地址猎人',
    description: '在链上追踪波场大户（Smart Money）动向，跟随其进行操作。',
  },
  'T-D-R-C': {
    title: '套利交易商',
    description: '在交易所利用波场系代币的价差或资金费率进行快速套利。',
  },
  'T-D-F-N': {
    title: '土狗挖掘机（T 版）',
    description: '专门在波场链上找新的 Meme 或小项目冲，极其敏锐。',
  },
  'T-D-F-C': {
    title: 'TRC20 投机客',
    description: '追求转账快、手续费低，在交易所频繁买卖波场系热门代币。',
  },
};

export const QUESTIONS: Question[] = [
  // Chain dimension (Q1, Q2)
  {
    id: 1,
    dimension: 'chain',
    question: '如果你被困在荒岛，只能保留一个链上钱包地址，你会选择？',
    options: [
      { label: 'A. 一个存满蓝筹 NFT 和各种协议代币的 Metamask 地址', value: 'A', score: 2 },
      { label: 'B. 一个交易飞快、总是能冲到最新 Meme 的 Phantom 地址', value: 'B', score: 2 },
      { label: 'C. 一个存放在硬件钱包里、几年没动过的"冷"地址', value: 'C', score: 2 },
      { label: 'D. 一个主要是为了低成本转 U 或玩老牌 DApp 的 Tron 地址', value: 'D', score: 2 },
    ],
  },
  {
    id: 2,
    dimension: 'chain',
    question: '你认为区块链最核心的魅力应该是？',
    options: [
      { label: 'A. 无限的可组合性与正统的去中心化生态', value: 'A', score: 2 },
      { label: 'B. 极致的性能、极低的转账费与高频的交互体验', value: 'B', score: 2 },
      { label: 'C. 绝对的价值存储属性与宏观经济的抗通胀性', value: 'C', score: 2 },
      { label: 'D. 极高的转账效率与最广泛的商业落地 / 出入金便利', value: 'D', score: 2 },
    ],
  },
  // Risk dimension (Q3, Q4)
  {
    id: 3,
    dimension: 'risk',
    question: '你刚买入的一个币在 2 小时内跌了 30%，你的反应是？',
    options: [
      { label: 'A. 正常，这只是波动，甚至考虑在 CEX 挂单补仓', value: 'A', score: 0 },
      { label: 'B. 只要没归零就接着舞，或者直接割肉去冲下一个翻倍机会', value: 'B', score: 1 },
    ],
  },
  {
    id: 4,
    dimension: 'risk',
    question: '你的持币周期通常是？',
    options: [
      { label: 'A. 以年为单位，信仰穿越牛熊', value: 'A', score: 0 },
      { label: 'B. 以小时或天为单位，翻倍就出本，甚至半小时就完成换手', value: 'B', score: 1 },
    ],
  },
  // Decision dimension (Q5, Q6)
  {
    id: 5,
    dimension: 'decision',
    question: '你在决定买入一个新项目前，首先会看？',
    options: [
      { label: 'A. 官网、白皮书、经济模型、融资背景和 GitHub 提交记录', value: 'A', score: 0 },
      { label: 'B. 推特讨论热度、KOL 是否喊单、有没有好玩的 Meme 梗', value: 'B', score: 1 },
    ],
  },
  {
    id: 6,
    dimension: 'decision',
    question: '当市场暴跌时，你更倾向于相信？',
    options: [
      { label: 'A. 链上数据（如大户流向、交易所净流入）与技术指标', value: 'A', score: 0 },
      { label: 'B. 社区的情绪、恐慌指数以及推特上的"家人们"是否还在', value: 'B', score: 1 },
    ],
  },
  // Habit dimension (Q7, Q8)
  {
    id: 7,
    dimension: 'habit',
    question: '你大部分的资产目前存放在？',
    options: [
      { label: 'A. 个人助记词钱包（如 Metamask, Ledger, Phantom）', value: 'A', score: 0 },
      { label: 'B. 顶级中心化交易所（如 Binance, OKX, Bybit）', value: 'B', score: 1 },
    ],
  },
  {
    id: 8,
    dimension: 'habit',
    question: '你如何看待"私钥 / 助记词"？',
    options: [
      { label: 'A. 它是我的生命线，我享受完全掌控资产的安全感，即便操作很繁琐', value: 'A', score: 0 },
      { label: 'B. 太麻烦了，我更害怕弄丢它，我更相信大交易所的安保和便捷的 UI', value: 'B', score: 1 },
    ],
  },
];
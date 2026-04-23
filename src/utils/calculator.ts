import { QUESTIONS, Result, PROFILES, CHAIN_INFO } from '../data/questions';

// Maps profile key -> image index (1-32), ordered by readme: E-H-R-N=1, E-H-R-C=2, E-H-F-N=3 ... T-D-F-C=32
const PROFILE_IMAGE_MAP: Record<string, number> = {
  'E-H-R-N': 1,
  'E-H-R-C': 2,
  'E-H-F-N': 3,
  'E-H-F-C': 4,
  'E-D-R-N': 5,
  'E-D-R-C': 6,
  'E-D-F-N': 7,
  'E-D-F-C': 8,
  'S-H-R-N': 9,
  'S-H-R-C': 10,
  'S-H-F-N': 11,
  'S-H-F-C': 12,
  'S-D-R-N': 13,
  'S-D-R-C': 14,
  'S-D-F-N': 15,
  'S-D-F-C': 16,
  'B-H-R-N': 17,
  'B-H-R-C': 18,
  'B-H-F-N': 19,
  'B-H-F-C': 20,
  'B-D-R-N': 21,
  'B-D-R-C': 22,
  'B-D-F-N': 23,
  'B-D-F-C': 24,
  'T-H-R-N': 25,
  'T-H-R-C': 26,
  'T-H-F-N': 27,
  'T-H-F-C': 28,
  'T-D-R-N': 29,
  'T-D-R-C': 30,
  'T-D-F-N': 31,
  'T-D-F-C': 32,
};

export function calculateResult(answers: number[]): Result {
  // Chain dimension: Q1(0) and Q2(1) - weighted scoring
  const chainScores = { E: 0, S: 0, B: 0, T: 0 };
  const chainMapping = [
    { E: 2, S: 0, B: 0, T: 0 }, // Q1 A -> E
    { E: 0, S: 2, B: 0, T: 0 }, // Q1 B -> S
    { E: 0, S: 0, B: 2, T: 0 }, // Q1 C -> B
    { E: 0, S: 0, B: 0, T: 2 }, // Q1 D -> T
  ];
  const chainMappingQ2 = [
    { E: 2, S: 0, B: 0, T: 0 }, // Q2 A -> E
    { E: 0, S: 2, B: 0, T: 0 }, // Q2 B -> S
    { E: 0, S: 0, B: 2, T: 0 }, // Q2 C -> B
    { E: 0, S: 0, B: 0, T: 2 }, // Q2 D -> T
  ];

  const chainScoresByQ1 = chainMapping[answers[0]] || { E: 0, S: 0, B: 0, T: 0 };
  const chainScoresByQ2 = chainMappingQ2[answers[1]] || { E: 0, S: 0, B: 0, T: 0 };

  chainScores.E = chainScoresByQ1.E + chainScoresByQ2.E;
  chainScores.S = chainScoresByQ1.S + chainScoresByQ2.S;
  chainScores.B = chainScoresByQ1.B + chainScoresByQ2.B;
  chainScores.T = chainScoresByQ1.T + chainScoresByQ2.T;

  // Find max chain
  let maxChain: 'E' | 'S' | 'B' | 'T' = 'E';
  let maxChainScore = 0;
  for (const [chain, score] of Object.entries(chainScores)) {
    if (score > maxChainScore) {
      maxChainScore = score;
      maxChain = chain as 'E' | 'S' | 'B' | 'T';
    }
  }

  // Risk dimension: Q3(2) and Q4(3) - A = 0 (H), B = 1 (D)
  const riskScore = answers[2] + answers[3];
  const risk: 'D' | 'H' = riskScore >= 2 ? 'D' : 'H';

  // Decision dimension: Q5(4) and Q6(5) - A = 1 (R), B = 0 (F)
  const decisionScore = answers[4] + answers[5];
  const decision: 'R' | 'F' = decisionScore >= 2 ? 'R' : 'F';

  // Habit dimension: Q7(6) and Q8(7) - A = 0 (N), B = 1 (C)
  const habitScore = answers[6] + answers[7];
  const habit: 'N' | 'C' = habitScore >= 2 ? 'C' : 'N';

  const profileKey = `${maxChain}-${risk}-${decision}-${habit}`;
  const profile = PROFILES[profileKey] || {
    title: '币圈新人',
    description: '正在探索自己的投资风格。',
  };

  return {
    chain: maxChain,
    risk,
    decision,
    habit,
    title: profile.title,
    description: profile.description,
    tagline: getTagline(maxChain, risk, decision, habit),
    advice: getAdvice(maxChain, risk),
    imageIndex: PROFILE_IMAGE_MAP[profileKey] ?? 1,
  };
}

function getTagline(chain: string, risk: string, decision: string, habit: string): string {
  const taglines: Record<string, string> = {
    'S-D-F-N': '"Sleep is for the weak, Sol is for the moon."',
    'S-D-F-C': '"K线上下抖，信仰不能丢。"',
    'S-D-R-N': '"数据不会骗人，但我可能会错过 alpha。"',
    'S-D-R-C': '"盘口就是我的圣经。"',
    'E-D-F-N': '"新协议，新机会，新风险。"',
    'B-D-F-C': '"减半即暴富，三年等一回。"',
    'E-H-R-N': '"钻石手，DeFi 梦。"',
    'B-H-R-N': '"私钥即主权，硬件冷存储。"',
    default: '"和时间做朋友，与波动共舞。"',
  };
  return taglines[`${chain}-${risk}-${decision}-${habit}`] || taglines.default;
}

function getAdvice(chain: string, risk: string): string {
  const chainAdvices: Record<string, string> = {
    'S-D': '注意休息，你的 F5 键快被按坏了。',
    'E-D': '注意协议风险，合约漏洞可能让你血本无归。',
    'B-D': '铭文有风险，打铭前请做好归零准备。',
    'T-D': '土狗虽香，谨慎土狗陷阱。',
    'S-H': '长期持有 Solana，让时间证明一切。',
    'E-H': 'DeFi 是个金矿，但也需要耐心。',
    'B-H': 'HODL 到底，时间会是最好的朋友。',
    'T-H': '稳健持币，波场生态稳步发展。',
  };
  return chainAdvices[`${chain}-${risk}`] || '保持理性，不要 FOMO。';
}

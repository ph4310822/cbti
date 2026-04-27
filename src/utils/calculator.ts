import { QUESTIONS, Result, PROFILES } from '../data/questions';

// Maps profile key -> image index (1-32), ordered by readme: E-H-R-N=1, E-H-R-C=2, E-H-F-N=3 ... N-D-F-C=32
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
  'N-H-R-N': 25,
  'N-H-R-C': 26,
  'N-H-F-N': 27,
  'N-H-F-C': 28,
  'N-D-R-N': 29,
  'N-D-R-C': 30,
  'N-D-F-N': 31,
  'N-D-F-C': 32,
};

export function calculateResult(answers: number[]): Result {
  // Chain dimension: Q1(0) and Q2(1) - weighted scoring
  const chainScores = { E: 0, S: 0, B: 0, N: 0 };
  const chainMapping = [
    { E: 2, S: 0, B: 0, N: 0 }, // Q1 A -> E
    { E: 0, S: 2, B: 0, N: 0 }, // Q1 B -> S
    { E: 0, S: 0, B: 2, N: 0 }, // Q1 C -> B
    { E: 0, S: 0, B: 0, N: 2 }, // Q1 D -> N (BNB Chain)
  ];
  const chainMappingQ2 = [
    { E: 2, S: 0, B: 0, N: 0 }, // Q2 A -> E
    { E: 0, S: 2, B: 0, N: 0 }, // Q2 B -> S
    { E: 0, S: 0, B: 2, N: 0 }, // Q2 C -> B
    { E: 0, S: 0, B: 0, N: 2 }, // Q2 D -> N (BNB Chain)
  ];

  const chainScoresByQ1 = chainMapping[answers[0]] || { E: 0, S: 0, B: 0, N: 0 };
  const chainScoresByQ2 = chainMappingQ2[answers[1]] || { E: 0, S: 0, B: 0, N: 0 };

  chainScores.E = chainScoresByQ1.E + chainScoresByQ2.E;
  chainScores.S = chainScoresByQ1.S + chainScoresByQ2.S;
  chainScores.B = chainScoresByQ1.B + chainScoresByQ2.B;
  chainScores.N = chainScoresByQ1.N + chainScoresByQ2.N;

  // Find max chain
  let maxChain: 'E' | 'S' | 'B' | 'N' = 'E';
  let maxChainScore = 0;
  for (const [chain, score] of Object.entries(chainScores)) {
    if (score > maxChainScore) {
      maxChainScore = score;
      maxChain = chain as 'E' | 'S' | 'B' | 'N';
    }
  }

  // Risk dimension: Q3(2) and Q4(3) - A = 0 (H), B = 1 (D)
  const riskScore = answers[2] + answers[3];
  const risk: 'D' | 'H' = riskScore >= 2 ? 'D' : 'H';

  // Decision dimension: Q5(4) and Q6(5) - A = 0 (R), B = 1 (F)
  const decisionScore = answers[4] + answers[5];
  const decision: 'R' | 'F' = decisionScore >= 2 ? 'F' : 'R';

  // Habit dimension: Q7(6) and Q8(7) - A = 0 (N), B = 1 (C)
  const habitScore = answers[6] + answers[7];
  const habit: 'N' | 'C' = habitScore >= 2 ? 'C' : 'N';

  const profileKey = `${maxChain}-${risk}-${decision}-${habit}`;
  const profile = PROFILES[profileKey] || {
    titleKey: 'profiles.default.title',
    descriptionKey: 'profiles.default.description',
  };

  return {
    chain: maxChain,
    risk,
    decision,
    habit,
    titleKey: profile.titleKey,
    descriptionKey: profile.descriptionKey,
    taglineKey: `taglines.${profileKey}`,
    adviceKey: `advice.${maxChain}-${risk}`,
    imageIndex: PROFILE_IMAGE_MAP[profileKey] ?? 1,
  };
}

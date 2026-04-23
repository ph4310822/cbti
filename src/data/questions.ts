export interface Question {
  id: number;
  dimension: 'chain' | 'risk' | 'decision' | 'habit';
  questionKey: string;
  optionKeys: string[];
}

export interface Result {
  chain: 'E' | 'S' | 'B' | 'T';
  risk: 'D' | 'H';
  decision: 'R' | 'F';
  habit: 'N' | 'C';
  titleKey: string;
  descriptionKey: string;
  taglineKey: string;
  adviceKey: string;
  imageIndex: number;
}

export interface ChainInfo {
  name: string;
  fullName: string;
  descriptionKey: string;
}

export const CHAIN_INFO: Record<string, ChainInfo> = {
  E: { name: 'EVM', fullName: 'Ethereum', descriptionKey: 'chains.E' },
  S: { name: 'Solana', fullName: 'Solana', descriptionKey: 'chains.S' },
  B: { name: 'Bitcoin', fullName: 'Bitcoin', descriptionKey: 'chains.B' },
  T: { name: 'Tron', fullName: 'Tron', descriptionKey: 'chains.T' },
};

export const PROFILES: Record<string, { titleKey: string; descriptionKey: string }> = {
  'E-H-R-N': { titleKey: 'profiles.E-H-R-N.title', descriptionKey: 'profiles.E-H-R-N.description' },
  'E-H-R-C': { titleKey: 'profiles.E-H-R-C.title', descriptionKey: 'profiles.E-H-R-C.description' },
  'E-H-F-N': { titleKey: 'profiles.E-H-F-N.title', descriptionKey: 'profiles.E-H-F-N.description' },
  'E-H-F-C': { titleKey: 'profiles.E-H-F-C.title', descriptionKey: 'profiles.E-H-F-C.description' },
  'E-D-R-N': { titleKey: 'profiles.E-D-R-N.title', descriptionKey: 'profiles.E-D-R-N.description' },
  'E-D-R-C': { titleKey: 'profiles.E-D-R-C.title', descriptionKey: 'profiles.E-D-R-C.description' },
  'E-D-F-N': { titleKey: 'profiles.E-D-F-N.title', descriptionKey: 'profiles.E-D-F-N.description' },
  'E-D-F-C': { titleKey: 'profiles.E-D-F-C.title', descriptionKey: 'profiles.E-D-F-C.description' },
  'S-H-R-N': { titleKey: 'profiles.S-H-R-N.title', descriptionKey: 'profiles.S-H-R-N.description' },
  'S-H-R-C': { titleKey: 'profiles.S-H-R-C.title', descriptionKey: 'profiles.S-H-R-C.description' },
  'S-H-F-N': { titleKey: 'profiles.S-H-F-N.title', descriptionKey: 'profiles.S-H-F-N.description' },
  'S-H-F-C': { titleKey: 'profiles.S-H-F-C.title', descriptionKey: 'profiles.S-H-F-C.description' },
  'S-D-R-N': { titleKey: 'profiles.S-D-R-N.title', descriptionKey: 'profiles.S-D-R-N.description' },
  'S-D-R-C': { titleKey: 'profiles.S-D-R-C.title', descriptionKey: 'profiles.S-D-R-C.description' },
  'S-D-F-N': { titleKey: 'profiles.S-D-F-N.title', descriptionKey: 'profiles.S-D-F-N.description' },
  'S-D-F-C': { titleKey: 'profiles.S-D-F-C.title', descriptionKey: 'profiles.S-D-F-C.description' },
  'B-H-R-N': { titleKey: 'profiles.B-H-R-N.title', descriptionKey: 'profiles.B-H-R-N.description' },
  'B-H-R-C': { titleKey: 'profiles.B-H-R-C.title', descriptionKey: 'profiles.B-H-R-C.description' },
  'B-H-F-N': { titleKey: 'profiles.B-H-F-N.title', descriptionKey: 'profiles.B-H-F-N.description' },
  'B-H-F-C': { titleKey: 'profiles.B-H-F-C.title', descriptionKey: 'profiles.B-H-F-C.description' },
  'B-D-R-N': { titleKey: 'profiles.B-D-R-N.title', descriptionKey: 'profiles.B-D-R-N.description' },
  'B-D-R-C': { titleKey: 'profiles.B-D-R-C.title', descriptionKey: 'profiles.B-D-R-C.description' },
  'B-D-F-N': { titleKey: 'profiles.B-D-F-N.title', descriptionKey: 'profiles.B-D-F-N.description' },
  'B-D-F-C': { titleKey: 'profiles.B-D-F-C.title', descriptionKey: 'profiles.B-D-F-C.description' },
  'T-H-R-N': { titleKey: 'profiles.T-H-R-N.title', descriptionKey: 'profiles.T-H-R-N.description' },
  'T-H-R-C': { titleKey: 'profiles.T-H-R-C.title', descriptionKey: 'profiles.T-H-R-C.description' },
  'T-H-F-N': { titleKey: 'profiles.T-H-F-N.title', descriptionKey: 'profiles.T-H-F-N.description' },
  'T-H-F-C': { titleKey: 'profiles.T-H-F-C.title', descriptionKey: 'profiles.T-H-F-C.description' },
  'T-D-R-N': { titleKey: 'profiles.T-D-R-N.title', descriptionKey: 'profiles.T-D-R-N.description' },
  'T-D-R-C': { titleKey: 'profiles.T-D-R-C.title', descriptionKey: 'profiles.T-D-R-C.description' },
  'T-D-F-N': { titleKey: 'profiles.T-D-F-N.title', descriptionKey: 'profiles.T-D-F-N.description' },
  'T-D-F-C': { titleKey: 'profiles.T-D-F-C.title', descriptionKey: 'profiles.T-D-F-C.description' },
};

export const QUESTIONS: Question[] = [
  // Chain dimension (Q1, Q2)
  {
    id: 1,
    dimension: 'chain',
    questionKey: 'questions.q1',
    optionKeys: ['questions.q1a', 'questions.q1b', 'questions.q1c', 'questions.q1d'],
  },
  {
    id: 2,
    dimension: 'chain',
    questionKey: 'questions.q2',
    optionKeys: ['questions.q2a', 'questions.q2b', 'questions.q2c', 'questions.q2d'],
  },
  // Risk dimension (Q3, Q4)
  {
    id: 3,
    dimension: 'risk',
    questionKey: 'questions.q3',
    optionKeys: ['questions.q3a', 'questions.q3b'],
  },
  {
    id: 4,
    dimension: 'risk',
    questionKey: 'questions.q4',
    optionKeys: ['questions.q4a', 'questions.q4b'],
  },
  // Decision dimension (Q5, Q6)
  {
    id: 5,
    dimension: 'decision',
    questionKey: 'questions.q5',
    optionKeys: ['questions.q5a', 'questions.q5b'],
  },
  {
    id: 6,
    dimension: 'decision',
    questionKey: 'questions.q6',
    optionKeys: ['questions.q6a', 'questions.q6b'],
  },
  // Habit dimension (Q7, Q8)
  {
    id: 7,
    dimension: 'habit',
    questionKey: 'questions.q7',
    optionKeys: ['questions.q7a', 'questions.q7b'],
  },
  {
    id: 8,
    dimension: 'habit',
    questionKey: 'questions.q8',
    optionKeys: ['questions.q8a', 'questions.q8b'],
  },
];

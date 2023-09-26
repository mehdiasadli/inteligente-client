import { PopulatedQuestion } from '../lib/types';

const QUESTION_COUNT_PER_DIFF = 5;

export const isPlayable = (questions: PopulatedQuestion[], subfield: string) => {
  const qs = questions.filter((q) => q.subfield._id === subfield);

  const res = Array.from({ length: 10 }, (_, i) => i + 1).every(
    (diff) => qs.filter((q) => q.difficulty === diff).length >= QUESTION_COUNT_PER_DIFF
  );

  return res;
};

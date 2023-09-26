import { DIFFICULTY } from './../types';

export const createCapitals = (
  capitals: { title: string; answers: string[]; difficulty: DIFFICULTY }[]
): any => {
  return capitals.map((capital) => ({
    field: 1,
    subfield: 1,
    title: `${capital.title} paytaxtı hansı şəhərdir?`,
    description: 'Şəhərin adını yazın',
    difficulty: capital.difficulty,
    answers: capital.answers,
  }));
};

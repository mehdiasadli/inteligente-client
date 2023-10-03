import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, Field, Question, Quiz, QUIZ_MODE, Subfield } from '../../lib/types';
import { getReadTime } from '../../utils/getTime';
import { normalizeAnswer } from '../../utils/normalizeAnswer';

interface QuizStoreState {
  id: string | null;
  field: Field | null;
  subfield: Subfield | null;
  mode: QUIZ_MODE | null;
  active: boolean;
  questions: Question[];
  round: number;
  answers: Answer[];
}

const initialState: QuizStoreState = {
  id: null,
  field: null,
  subfield: null,
  mode: null,
  active: false,
  questions: [],
  round: 1,
  answers: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<{ data: Quiz }>) => {
      const { field, mode, questions, subfield, _id } = action.payload.data;

      state.id = _id;
      state.field = field;
      state.subfield = subfield;
      state.mode = mode;
      state.questions = questions;
      state.active = true;
      state.round = 1;
    },
    answer: (state, action: PayloadAction<{ answer: string; time: number }>) => {
      const { answer, time } = action.payload;
      const currentQuestion = state.questions[state.round - 1];

      let isCorrect = false;
      const normalizedCorrects = currentQuestion.answers?.map((ans) =>
        normalizeAnswer(ans.toLowerCase().trim())
      );
      if (normalizedCorrects?.includes(normalizeAnswer(answer.toLowerCase().trim()))) {
        isCorrect = true;
      }

      const diff = currentQuestion.difficulty;
      const readTime = getReadTime(currentQuestion.title);

      const point = diff * 0.8 + Math.max(0, 10 - time + readTime) * 0.2;
      const penalty = 10 / diff + Math.min(10, time - readTime) * 0.1;

      state.answers.push({
        answer,
        isCorrect,
        question: currentQuestion,
        time,
        point: isCorrect ? point : -penalty,
      });

      state.round++;
    },
    end: (state) => {
      state.id = null;
      state.field = null;
      state.subfield = null;
      state.mode = null;
      state.active = false;
      state.questions = [];
      state.answers = [];
      state.round = 1;
    },
  },
});

export const { start, answer, end } = quizSlice.actions;
export default quizSlice.reducer;

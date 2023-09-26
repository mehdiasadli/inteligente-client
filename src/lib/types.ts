type Mongoose = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

export enum DIFFICULTY {
  SUPER_EASY = 1,
  SO_EASY = 2,
  EASY = 3,
  MEDIUM_EASY = 4,
  MEDIUM = 5,
  MEDIUM_HARD = 6,
  HARD = 7,
  SO_HARD = 8,
  SUPER_HARD = 9,
  GENIUS = 10,
}
export type Subfield = {
  name: string;
  image?: string;
  description?: string;
  field: Field;
} & Mongoose;

export type PopulatedSubfield = {
  field: Field;
} & Subfield;

export type Field = {
  name: string;
  image?: string;
  description?: string;
  subfields: string[];
} & Mongoose;

export type PopulatedField = {
  subfields: Subfield[];
} & Field;

export type Option = {
  title: string;
  description?: string;
  image?: string;
  isCorrect: boolean;
};

export enum USER_ROLE {
  MEMBER = 'Member',
  MOD = 'Moderator',
  ADMIN = 'Admin',
}

export enum QUESTION_TYPE {
  OE = 'OE',
  MC = 'MC',
}

export type Question = {
  title: string;
  description?: string;
  type: QUESTION_TYPE;
  difficulty: DIFFICULTY;
  field: string;
  subfield: string;
  image?: string;
  options?: Option[];
  answers?: string[];
} & Mongoose;

export type PopulatedQuestion = {
  field: Field;
  subfield: Subfield;
} & Question;

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  role: USER_ROLE;
  bio?: string;
  image?: string;
  token: string;
} & Mongoose;

export enum QUIZ_MODE {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export type Answer = {
  question?: Question;
  answer?: string;
  isCorrect?: boolean;
  point: number;
  time?: number;
};

export type Quiz = {
  user: User;
  field: Field;
  subfield: Subfield;
  mode: QUIZ_MODE;
  questions: Question[];
  answers?: Answer[];
  points?: number;
  finished: boolean;
} & Mongoose;

const vowels = ['a', 'ı', 'o', 'u', 'e', 'ə', 'i', 'ö', 'ü'];

const READ_PER_SECOND = 0.12;
const WRITE_PER_SECOND = 4;

export const getReadTime = (string: string) => {
  let syllable = 0;

  for (let letter of string) {
    if (vowels.includes(letter)) {
      syllable++;
    }
  }

  return READ_PER_SECOND * syllable;
};
export const getWriteTime = (string: string) => {
  const len = string.length;

  return len === 0 ? 0 : WRITE_PER_SECOND / len;
};

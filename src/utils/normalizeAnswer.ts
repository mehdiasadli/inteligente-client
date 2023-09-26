const map: Record<string, string> = {
  ə: 'a',
  ü: 'u',
  ç: 'c',
  ş: 's',
  ı: 'i',
  ğ: 'g',
  ö: 'o',
};

export const normalizeAnswer = (str: string) => {
  return str
    .split('')
    .map((letter) =>
      letter === ' ' || letter === '\n' || letter === '\t' ? '' : map[letter] || letter
    )
    .join('');
};

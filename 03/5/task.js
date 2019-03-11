/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */

const digits = {
  I: 1, IV: 4, V: 5, IX: 9, X: 10, XL: 40, L: 50, XC: 90, C: 100, CD: 400, D: 500, CM: 900, M: 1000
};

function parseRoman(str) {
  const number = str
    .match(/(IV|IX|XL|XC|CD|CM|.)/gi)
    .reduce((sum, match) => sum + digits[match], 0);

  if (isNaN(number)) {
    return undefined;
  }

  const result = new Array(number);

  for (let i = 0; i < number; ++i) {
    result[i] = i;
  }

  return result;
}

const handler = {
  get(target, name) {
    return parseRoman(name.toString()) || target[name];
  }
};

const proto = Object.getPrototypeOf(Number.prototype);
const proxy = new Proxy(proto, handler);

Object.setPrototypeOf(Number.prototype, proxy);

/**
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */

// State machine definition. '_' is for any other character
// Numbers are used like terminal states
const states = {
  M: 1000,
  C: { M: 900, D: 400, _: 100 },
  D: 500,
  X: { C: 90, L: 40, _: 10 },
  L: 50,
  I: { X: 9, V: 4, _: 1 },
  V: 5,
  _: 0
};

function parseRoman(str) {
  let number = 0;

  for (let i = 0; i < str.length;) {
    let state = states;

    while (isNaN(state)) {
      state = state[str[i]] ? state[str[i++]] : state._;
    }

    if (state === 0) {
      return null; // Stop on invalid roman character
    }

    number += state;
  }

  const result = [];

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

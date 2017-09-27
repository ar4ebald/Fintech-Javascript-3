/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */
function getMinMax(string) {
  // for ECMAScript 2015 number literal specification see link below
  // https://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals
  const numbers = string.match(/[+-]?(0x[\da-f]+|0b[01]+|0o[0-7]+|(\.\d+|(0|[1-9]\d*)\.?\d*(e[+-]?\d+)?))/gi);

  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciSimple(x) {
  if (x === 0) {
    return 0;
  }

  if (x === 1) {
    return 1;
  }

  if (x < 0) {
    return (-1) ** (1 - x) * fibonacciSimple(-x);
  }

  return fibonacciSimple(x - 1) + fibonacciSimple(x - 2);
}

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
function fibonacciWithCache(x) {
  if (x < 0) {
    return (-1) ** (1 - x) * fibonacciWithCache(-x);
  }

  if (x >= fibonacciWithCache.cache.length) {
    fibonacciWithCache.cache[x] = fibonacciWithCache(x - 1) + fibonacciWithCache(x - 2);
  }

  return fibonacciWithCache.cache[x];
}

fibonacciWithCache.cache = [0, 1];

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
function printNumbers(max, cols) {
  function* range(count, transform) {
    for (let i = 0; i < count; ++i) {
      yield transform(i);
    }
  }

  const cells = max + 1;
  const rows = Math.ceil(cells / cols);
  const threshold = (cells % cols) || (cols - 1);

  function getNumberAt(row, col) {
    const beforeThreshold = Math.min(threshold, col);
    const afterThreshold = Math.max(0, col - threshold);

    return row + beforeThreshold * rows + afterThreshold * (rows - 1);
  }

  return Array.from(range(
    rows,
    row => Array.from(range(
      Math.min(row * cols + cols, cells) - row * cols,
      col => getNumberAt(row, col).toString().padStart(2)
    )).join(' ')
  )).join('\n');
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
function rle(input) {
  return input.replace(/(.)\1*/g, i => (i.length > 1 ? i[0] + i.length : i[0]));
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};

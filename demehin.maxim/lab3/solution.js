export function rotateArray(arr, steps) {
  if (!Number.isInteger(steps)) {
    throw new TypeError('second arg should be an integer');
  }

  const n = arr.length;
  if (n === 0) {
    return [];
  }

  const k = ((steps % n) + n) % n;

  return [...arr.slice(n - k), ...arr.slice(0, n - k)];
}

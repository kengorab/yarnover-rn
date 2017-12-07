export function bools2Int({ trueValue = 1, falseValue = 0 }, ...vals) {
  vals.reduce((acc, next) => acc + !!next ? trueValue : falseValue, 0)
}

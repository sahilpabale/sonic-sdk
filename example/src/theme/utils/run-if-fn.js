// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (value) => typeof value === 'function';

export function runIfFn(valueOrFn, ...args) {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
}

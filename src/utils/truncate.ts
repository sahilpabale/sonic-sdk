export const truncateDid = (did: string) => {
  return truncate(did, 10, 6);
};

export const truncate = (str: string, start: number, end: number) => {
  return str.slice(0, start) + '...' + str.slice(-end);
};

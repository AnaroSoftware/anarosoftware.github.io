type PrefixKeys<T extends Record<string, unknown>, P extends string> = {
  [K in keyof T as `${P}_${string & K}`]: T[K];
};

export const prefixObjectKeys = <T extends Record<string, unknown>, P extends string>(
  prefix: P,
  object: T,
): PrefixKeys<T, P> => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [`${prefix}_${key}`, value]),
  ) as PrefixKeys<T, P>;
};

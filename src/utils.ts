/**
 * Deep `Partial<T>`.
 */
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * All TypeScript primitive types.
 */
type Primitive = string | number | boolean | symbol | null | undefined | bigint;

/**
 * A plain TypeScript object.
 */
type PlainObject = Record<string | number | symbol, unknown>;

/**
 * Merges two objects deeply.
 */
export type DeepMerge<T, U> = U extends Primitive
  ? T
  : T extends Primitive
    ? T
    : U extends readonly (infer TItem)[]
      ? T extends readonly (infer UItem)[]
        ? Array<DeepMerge<TItem, UItem>>
        : T
      : U extends PlainObject
        ? T extends PlainObject
          ? {
              [K in keyof U | keyof T]: K extends keyof T
                ? K extends keyof U
                  ? DeepMerge<U[K], T[K]>
                  : T[K]
                : K extends keyof U
                  ? U[K]
                  : never;
            }
          : T
        : T;

/**
 * Checks if a value is a plain object.
 * @param value The value to check.
 * @returns If the value is a plain object.
 */
function isPlainObject(value: any): value is Record<string, any> {
  return (
    value !== null &&
    typeof value === "object" &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/**
 * Merges two objects deeply.
 * @param source The source object.
 * @param target The target object.
 * @returns The merged objects.
 */
export function merge<T, U>(source: T, target: U): DeepMerge<T, U> {
  if (Array.isArray(source) && Array.isArray(target)) {
    // Replace arrays
    return target as any;
  }

  if (isPlainObject(source) && isPlainObject(target)) {
    const result: any = {};
    const keys = new Set([...Object.keys(source), ...Object.keys(target)]);
    keys.forEach((key) => {
      const sourceVal = (source as any)[key];
      const targetVal = (target as any)[key];

      if (sourceVal !== undefined && targetVal !== undefined) {
        result[key] = merge(sourceVal, targetVal);
      } else if (targetVal !== undefined) {
        result[key] = targetVal;
      } else {
        result[key] = sourceVal;
      }
    });
    return result;
  }

  // For class instances or primitives, always use target
  return target as any;
}

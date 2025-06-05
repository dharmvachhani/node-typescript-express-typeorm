export const isEmptyObject = (obj: unknown): boolean => {
  if (obj == null) return true;
  if (typeof obj !== 'object' || Array.isArray(obj)) return false;
  return Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

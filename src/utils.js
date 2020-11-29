export const isArray = (obj) => Array.isArray(obj);
export const isObject = (obj) => typeof obj === "object" && !isArray(obj);
export const isParent = (obj) => isArray(obj) || isObject(obj);
export const getFormattedValue = (obj) => {
  if (typeof obj === "string") return `"${obj}"`;

  return obj.toString();
};

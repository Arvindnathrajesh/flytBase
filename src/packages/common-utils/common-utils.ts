export const setPropValue = <T>(oldValue: T, newValue: T): T => {
  return newValue !== undefined ? newValue : oldValue;
};

export const setObjProp = <T>(key: keyof T, oldValue: T, newValue: T) => {
  oldValue[key] = setPropValue(oldValue[key], newValue[key]);
};

export const setObjProps = <T>(keys: (keyof T)[], oldValue: T, newValue: T) => {
  for (const key of keys) {
    setObjProp(key, oldValue, newValue);
  }
};

export const isObjectEmpty = (obj: {}) => Object.keys(obj).length === 0;

export const isStringEmpty = (str: string) => !str || /^\s*$/.test(str);

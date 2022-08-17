const setStorage = (name: string, value: any) => {
  sessionStorage.setItem(name, JSON.stringify(value));
};

const getStorage = (name: string) => {
  return JSON.parse(sessionStorage.getItem(name) || "[]");
};

export { setStorage, getStorage };

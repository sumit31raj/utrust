const setStorage = (name: string, value: any) => {
  typeof sessionStorage !== "undefined" && sessionStorage.setItem(name, JSON.stringify(value));
};

const getStorage = (name: string) => {
  return typeof sessionStorage !== "undefined" && JSON.parse(sessionStorage.getItem(name) || "[]");
};

const setStorageNetwork = (network: string) => {
  typeof sessionStorage !== "undefined" && sessionStorage.setItem("network", network);
}

const getStorageNetwork = () => {
  return (typeof sessionStorage !== "undefined" && sessionStorage.getItem("network")) || "ropsten";
}

export { setStorage, getStorage, setStorageNetwork, getStorageNetwork };

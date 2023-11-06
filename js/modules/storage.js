export const addStorageTask = (arr, task) => {
  arr.push(task);
};
export const getStorage = (key) =>
  (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []);

export const setStorage = (obj, key) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

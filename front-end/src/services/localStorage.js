const USER = 'user';
const CART = 'cart';
// const NAME = 'name';
const ITEM = 'item';

// add user email
export const addUser = (name, email, role, token) => {
  localStorage.setItem(USER, JSON.stringify({ name, email, role, token }));
};

// get user name localstorage
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem(USER)) || { name: '' };
  return user;
};

// add fav
export const addFavorite = (item) => localStorage
  .setItem(CART, JSON.stringify(item)) || [];

// remove fav
export const removeFromFavorite = (id) => {
  const items = JSON.parse(localStorage.getItem(ITEM)) || [];
  const newItem = items.filter((item) => item.id !== id);
  localStorage.setItem(ITEM, JSON.stringify(newItem));
};

// search user item
export const getItem = () => {
  const item = JSON.parse(localStorage.getItem(ITEM)) || [];
  return item;
};

// limpa o localStorage
export const cleanLocalStorage = () => localStorage.clear();

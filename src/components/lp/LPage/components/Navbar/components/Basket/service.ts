import { BasketProduct, BasketStorage } from "./types";

export const createBasket = () => {
  const basket: BasketStorage = {
    items: [],
    subtotal: 0,
  };

  localStorage.setItem("basket", JSON.stringify(basket));
  window.dispatchEvent(new Event("basketChanged"));
};

export const getBasket = (): BasketStorage => {
  const basket = localStorage.getItem("basket");

  if (!basket) {
    createBasket();
    return getBasket();
  }

  return JSON.parse(basket);
};

export const addToBasket = (product: BasketProduct) => {
  const basket = getBasket();

  const productIndex = basket.items.findIndex((item) => item.id === product.id);

  if (productIndex === -1) {
    basket.items.push(product);
  } else {
    basket.items[productIndex].quantity += product.quantity;
  }

  basket.subtotal += product.price * product.quantity;

  localStorage.setItem("basket", JSON.stringify(basket));
  window.dispatchEvent(new Event("basketChanged"));
};

export const removeFromBasket = (productId: string) => {
  const basket = getBasket();

  const productIndex = basket.items.findIndex((item) => item.id === productId);

  if (productIndex === -1) {
    return;
  }

  const product = basket.items[productIndex];

  basket.items.splice(productIndex, 1);
  basket.subtotal -= product.price * product.quantity;

  localStorage.setItem("basket", JSON.stringify(basket));
  window.dispatchEvent(new Event("basketChanged"));
};

export const clearBasket = () => {
  createBasket();
};

export const updateBasket = (product: BasketProduct) => {
  const basket = getBasket();

  const productIndex = basket.items.findIndex((item) => item.id === product.id);

  if (productIndex === -1) {
    return;
  }

  const oldProduct = basket.items[productIndex];

  basket.subtotal -= oldProduct.price * oldProduct.quantity;
  basket.subtotal += product.price * product.quantity;

  basket.items[productIndex] = product;

  localStorage.setItem("basket", JSON.stringify(basket));
  window.dispatchEvent(new Event("basketChanged"));
};

const ShoppingCart = require('./shoppingCart');

describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test('should add items to the cart', () => {
    cart.addToCart('banana', 2);
    expect(cart.items).toEqual({ banana: 2 });
  });

  test('should increment quantity when adding the same item multiple times', () => {
    cart.addToCart('banana', 2);
    cart.addToCart('banana', 3);
    expect(cart.items).toEqual({ banana: 5 });
  });

  test('should remove items from the cart', () => {
    cart.items = { banana: 2, milk: 1 };
    cart.removeFromCart('banana', 1);
    expect(cart.items).toEqual({ banana: 1, milk: 1 });
  });

  test('should decrement quantity when removing the same item multiple times', () => {
    cart.items = { banana: 5 };
    cart.removeFromCart('banana', 2);
    cart.removeFromCart('banana', 3);
    expect(cart.items).toEqual({ banana: 0 });
  });

  test('should calculate the total cost of items in the cart', () => {
    cart.items = { banana: 2, milk: 1, butter: 3 };
    const total = cart.calculateTotal();
    expect(total).toBe(2 * 0.5 + 1 * 6.3 + 3 * 4);
  });
});

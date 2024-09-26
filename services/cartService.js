const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Bundle = require('../models/bundleModel');

async function addCartItem(products) {
  try {
    let cart;
    const res = await Cart.find();

    if (res.length === 0) {
      cart = new Cart({ products });
    } else {
      cart = res[0];

      for (const item of products) {
        const { product, quantity } = item;

        const findProduct = await Product.findById(product);
        if (!findProduct) {
          throw new Error(`Product with ID ${product} not found`);
        }

        const bundle = await Bundle.findOne({ products: product, isActive: true });
        if (bundle) {
          const discountedPrice = bundle.price * ((100 - bundle.discount) / 100);
          item.price = discountedPrice;
        }

        const existingProductIndex = cart.products.findIndex(
          (p) => p.product.toString() === product.toString(),
        );

        if (existingProductIndex > -1) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push({
            product,
            quantity,
            price: item.price || findProduct.price,
          });
        }
      }
    }

    cart.totalPrice = await calculateTotalPrice(cart.products);
    const updatedCart = await cart.save();
    return updatedCart;
  } catch (error) {
    console.log('Error addCartItem service: ', error);
    throw error;
  }
}

async function calculateTotalPrice(products) {
  let totalPrice = 0;

  for (const item of products) {
    const product = await Product.findById(item.product);
    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }

  return totalPrice;
}

module.exports = {
  addCartItem,
};

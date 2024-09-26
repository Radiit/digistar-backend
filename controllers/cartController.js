const cartService = require('../services/cartService');

// Mendapatkan Detail Keranjang
exports.getCart = async (req, res) => {
  try {
    const carts = await cartService.findAllCarts();
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

// Menambahkan Produk ke Keranjang
exports.addCart = async (req, res) => {
  try {
    const cart = await cartService.addCartItem(req.body);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const productService = require('../services/productService');

// Mendapatkan Semua Produk
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.findAllProducts(req);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

// Mendapatkan Produk Berdasarkan ID
exports.getOneProductById = async (req, res) => {
  try {
    const product = await productService.findProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

// Membuat Produk Baru
exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'No image uploaded',
      });
    }

    const newProduct = await productService.createProduct(req.body, req.file);

    return res.status(201).json({
      status: 'success',
      code: 201,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

// Memperbarui Produk
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body, req.file);

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

// Menghapus Produk
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

const catalogService = require('../services/catalogService');

// Mendapatkan Katalog
exports.getAllCatalog = async (req, res) => {
  try {
    const catalog = await catalogService.findAllCatalog(req);
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: catalog,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: error.message,
    });
  }
};

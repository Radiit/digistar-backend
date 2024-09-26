const Bundle = require('../models/bundleModel');
const { saveImage, deleteImage } = require('./imageService');
const Product = require('../models/productModel');

async function findAllBundles(req) {
  try {
    const { search, minPrice, maxPrice, isActive, sortBy, order } = req.query;
    const currentDate = new Date();

    const query = {
      startTime: { $lte: currentDate },
      endTime: { $gte: currentDate },
    };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (Number(minPrice) && Number(maxPrice)) {
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: Number(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }
    if (isActive) {
      query.isActive = isActive === 'true';
    }

    const sort = {};
    if (sortBy && order) {
      sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    const bundles = await Bundle.find(query).sort(sort).populate('products');
    return bundles;
  } catch (error) {
    console.log('Error findAllBundles service: ', error);
    throw error;
  }
}

async function createBundle(data, file) {
  try {
    if (!data.products || data.products.length < 2) {
      throw new Error('Bundle must have more than one product');
    }

    const productSet = new Set(data.products);
    if (productSet.size !== data.products.length) {
      throw new Error('Duplicate products are not allowed in the bundle');
    }

    for (const productId of data.products) {
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        throw new Error(`Product with id ${productId} not found`);
      }
    }

    const imagePath = await saveImage(file);

    const newBundle = new Bundle({ 
      ...data, 
      image: imagePath, 
      discount: data.discount || 0, 
      startTime: data.startTime, 
      endTime: data.endTime 
    });
    
    const savedBundle = await newBundle.save();
    
    return await calculateBundlePrice(savedBundle);
  } catch (error) {
    console.log('Error createBundle service: ', error);
    throw error;
  }
}

async function calculateBundlePrice(bundle) {
  await bundle.populate('products');
  const bundlePrice = bundle.products.reduce((total, product) => {
    return total + product.price;
  }, 0);
  bundle.price = bundlePrice;

  return await bundle.save();
}

module.exports = {
  findAllBundles,
  createBundle,
};

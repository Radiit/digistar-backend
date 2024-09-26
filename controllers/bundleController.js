const Bundle = require('../models/bundleModel');

// Mendapatkan Semua Bundle
exports.getAllBundles = async (req, res) => {
  try {
    const bundles = await Bundle.find().populate('products');
    res.status(200).json(bundles);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching bundles', error });
  }
};

// Mendapatkan Bundle Berdasarkan ID
exports.getBundleById = async (req, res) => {
  try {
    const bundle = await Bundle.findById(req.params.id).populate('products');
    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }
    res.status(200).json(bundle);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching bundle', error });
  }
};

// Membuat Bundle Baru
exports.createBundle = async (req, res) => {
  try {
    const { name, description, price, discount, startTime, endTime, products } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newBundle = new Bundle({
      name,
      description,
      image,
      price,
      discount,
      startTime,
      endTime,
      products,
    });

    await newBundle.save();
    res.status(201).json({ message: 'Bundle created successfully', data: newBundle });
  } catch (error) {
    res.status(400).json({ message: 'Error creating bundle', error });
  }
};

// Memperbarui Bundle
exports.updateBundle = async (req, res) => {
  try {
    const { name, description, price, discount, startTime, endTime, products } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const bundle = await Bundle.findByIdAndUpdate(
      req.params.id,
      { name, description, price, discount, startTime, endTime, products, image },
      { new: true }
    );

    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json({ message: 'Bundle updated successfully', data: bundle });
  } catch (error) {
    res.status(400).json({ message: 'Error updating bundle', error });
  }
};

// Menghapus Bundle
exports.deleteBundle = async (req, res) => {
  try {
    const bundle = await Bundle.findByIdAndDelete(req.params.id);

    if (!bundle) {
      return res.status(404).json({ message: 'Bundle not found' });
    }

    res.status(200).json({ message: 'Bundle deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting bundle', error });
  }
};

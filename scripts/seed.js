const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/productModel');
const Bundle = require('../models/bundleModel');

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    seedData(); // Mulai proses seeding data setelah koneksi berhasil
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Seed Data untuk Produk
const products = [
  {
    name: 'Stapler Besar',
    description: 'Stapler besar berwarna putih',
    price: 141900,
    stock: 50,
    minPurchase: 1,
    brand: 'BANTEX',
    category: 'Office & Stationery',
    dimensions: '16x7x4 cm',
    weight: 300,
    location: 'Kab. Klaten',
    seller: 'Apsara Tiyasa Sambada',
    image: '/uploads/stapler_besar.jpg' // Tambahkan gambar untuk produk
  },
  {
    name: 'Kertas A4',
    description: 'Kertas A4 80gsm',
    price: 50000,
    stock: 100,
    minPurchase: 1,
    brand: 'PaperOne',
    category: 'Office & Stationery',
    dimensions: '210x297 mm',
    weight: 80,
    location: 'Kab. Klaten',
    seller: 'Apsara Tiyasa Sambada',
    image: '/uploads/kertas_a4.jpg' // Tambahkan gambar untuk produk
  },
  {
    name: 'Pulpen Gel',
    description: 'Pulpen Gel dengan tinta hitam, halus dan nyaman digunakan',
    price: 12000,
    stock: 200,
    minPurchase: 2,
    brand: 'Snowman',
    category: 'Office & Stationery',
    dimensions: '14x1x1 cm',
    weight: 20,
   
    location: 'Kab. Sleman',
    seller: 'PT. Sumber Tulis',
    image: '/uploads/pulpen_gel.jpg' // Tambahkan gambar untuk produk
  },
  {
    name: 'Kalkulator Scientific',
    description: 'Kalkulator scientific dengan 240 fungsi, cocok untuk keperluan sekolah dan kantor',
    price: 185000,
    stock: 75,
    minPurchase: 1,
    brand: 'Casio',
    category: 'Office & Stationery',
    dimensions: '16x8x1.5 cm',
    weight: 150,
    location: 'Kab. Bantul',
    seller: 'PT. Sarana Tulis',
    image: '/uploads/kalkulator_scientific.jpg' // Tambahkan gambar untuk produk
  },
  {
    name: 'Penggaris Stainless 30cm',
    description: 'Penggaris stainless steel ukuran 30cm, anti karat dan tahan lama',
    price: 25000,
    stock: 150,
    minPurchase: 1,
    brand: 'Faber-Castell',
    category: 'Office & Stationery',
    dimensions: '30x2x0.1 cm',
    weight: 50,
    location: 'Kab. Sleman',
    seller: 'PT. Sumber Tulis',
    image: '/uploads/penggaris_stainless.jpg' // Tambahkan gambar untuk produk
  },
  {
    name: 'Spidol Permanen',
    description: 'Spidol permanen warna hitam, tahan air dan tidak mudah pudar',
    price: 15000,
    stock: 180,
    minPurchase: 3,
    brand: 'Snowman',
    category: 'Office & Stationery',
    dimensions: '15x1x1 cm',
    weight: 25,
    location: 'Kab. Klaten',
    seller: 'Apsara Tiyasa Sambada',
    image: '/uploads/spidol_permanen.jpg' // Tambahkan gambar untuk produk
  },
  {
    name: 'Tipe-X Cair',
    description: 'Tipe-X cair dengan kuas, mudah digunakan dan cepat kering',
    price: 8000,
    stock: 250,
    minPurchase: 1,
    brand: 'Kenko',
    category: 'Office & Stationery',
    dimensions: '10x2x2 cm',
    weight: 30,
    location: 'Kab. Bantul',
    seller: 'PT. Sarana Tulis',
    image: '/uploads/tipex_cair.jpg' // Tambahkan gambar untuk produk
  }
];

// Seed Data untuk Bundle
const bundles = [
  {
    name: 'Flash Sale Office Bundle',
    description: 'Bundling alat tulis kantor selama flash sale',
    price: 500000,
    discount: 20,
    startTime: new Date('2024-09-25T08:00:00.000Z'),
    endTime: new Date('2024-09-25T18:00:00.000Z'),
    products: [], // Produk akan diisi nanti setelah disimpan
    image: '/uploads/flash_sale_office_bundle.jpg' // Tambahkan gambar untuk bundle
  },
  {
    name: 'Bundle Alat Tulis Siswa',
    description: 'Paket hemat alat tulis untuk siswa, termasuk pulpen, penggaris, dan pensil',
    price: 75000,
    discount: 10,
    startTime: new Date('2024-09-30T08:00:00.000Z'),
    endTime: new Date('2024-09-30T18:00:00.000Z'),
    products: [], // Produk akan diisi nanti setelah disimpan
    image: '/uploads/bundle_alat_tulis_siswa.jpg' // Tambahkan gambar untuk bundle
  },
  {
    name: 'Paket Kalkulator dan Pulpen',
    description: 'Bundling kalkulator scientific dan pulpen gel, cocok untuk keperluan akademis',
    price: 195000,
    discount: 15,
    startTime: new Date('2024-10-01T09:00:00.000Z'),
    endTime: new Date('2024-10-01T17:00:00.000Z'),
    products: [], // Produk akan diisi nanti setelah disimpan
    image: '/uploads/bundle_kalkulator_pulpen.jpg' // Tambahkan gambar untuk bundle
  }
];

// Fungsi untuk seeding data
async function seedData() {
  try {
    // Kosongkan koleksi sebelumnya
    await Product.deleteMany({});
    await Bundle.deleteMany({});

    // Tambahkan produk ke dalam database
    const savedProducts = await Product.insertMany(products);
    console.log('Products seeded:', savedProducts);

    // Tambahkan produk yang tersimpan ke bundle
    bundles[0].products = savedProducts.slice(0, 3).map((product) => product._id); // Bundle 1: 3 produk pertama
    bundles[1].products = savedProducts.slice(3, 5).map((product) => product._id); // Bundle 2: produk 4 dan 5
    bundles[2].products = savedProducts.slice(2, 4).map((product) => product._id); // Bundle 3: produk 3 dan 4

    // Tambahkan bundle ke dalam database
    const savedBundles = await Bundle.insertMany(bundles);
    console.log('Bundles seeded:', savedBundles);

    // Tutup koneksi ke MongoDB
    mongoose.connection.close();
  } catch (error) {
    console.log('Error seeding data:', error);
  }
}

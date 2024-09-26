const cors = require('cors');
const express = require('express');
const mongodb = require('./database/mongodb/db');
const swaggerUi = require('swagger-ui-express'); // Import Swagger UI
const swaggerSpec = require('./config/swaggerConfig'); // Import konfigurasi Swagger

require('dotenv').config();

const catalogRoutes = require('./routes/catalogRoutes');
const bundleRoutes = require('./routes/bundleRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

mongodb.connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Integrasi Swagger UI di /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Tambahkan ini untuk Swagger

app.use('/catalog', catalogRoutes);
app.use('/products', productRoutes);
app.use('/bundles', bundleRoutes);
app.use('/carts', cartRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});

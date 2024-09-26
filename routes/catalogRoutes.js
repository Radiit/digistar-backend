const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Catalog:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         bundles:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Bundle'
 *       example:
 *         products:
 *           - _id: "6123abcde1234567890"
 *             name: "Stapler Besar"
 *             description: "Stapler besar berwarna putih"
 *             price: 141900
 *             image: "/uploads/product_image.jpg"
 *             isActive: true
 *         bundles:
 *           - _id: "6123abcdef1234567890"
 *             name: "Flash Sale Office Bundle"
 *             description: "Bundling alat tulis kantor selama flash sale"
 *             price: 500000
 *             discount: 20
 *             products:
 *               - "Stapler Besar"
 *               - "Kertas A4"
 *             image: "/uploads/bundle_image.jpg"
 *             isActive: true
 */

/**
 * @swagger
 * /catalog:
 *   get:
 *     summary: Retrieve a list of products and bundles in the catalog
 *     responses:
 *       200:
 *         description: A list of products and bundles in the catalog
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Catalog'
 *       500:
 *         description: Error retrieving catalog
 */
router.get('/', catalogController.getAllCatalog);

module.exports = router;

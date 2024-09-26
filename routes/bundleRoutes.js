const express = require('express');
const multer = require('multer');
const bundleController = require('../controllers/bundleController');

const router = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for buffer
const upload = multer({ storage });

/**
 * @swagger
 * components:
 *   schemas:
 *     Bundle:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *         - products
 *         - discount
 *         - startTime
 *         - endTime
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the bundle
 *         description:
 *           type: string
 *           description: A brief description of the bundle
 *         price:
 *           type: number
 *           description: The price of the bundle
 *         discount:
 *           type: number
 *           description: Discount applied during flash sale
 *         products:
 *           type: array
 *           items:
 *             type: string
 *           description: List of product IDs in the bundle
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: Start time of the flash sale
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: End time of the flash sale
 *       example:
 *         name: Flash Sale Office Bundle
 *         description: Bundling alat tulis kantor selama flash sale
 *         price: 500000
 *         discount: 20
 *         products: ["6123abcde1234567890", "6123abcdf1234567890"]
 *         startTime: 2024-09-25T08:00:00.000Z
 *         endTime: 2024-09-25T18:00:00.000Z
 */

/**
 * @swagger
 * /bundles:
 *   get:
 *     summary: Retrieve a list of bundles
 *     responses:
 *       200:
 *         description: A list of bundles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bundle'
 */
router.get('/', bundleController.getAllBundles);

/**
 * @swagger
 * /bundles/{id}:
 *   get:
 *     summary: Retrieve a single bundle by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bundle to retrieve
 *     responses:
 *       200:
 *         description: A single bundle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 *       404:
 *         description: Bundle not found
 */
router.get('/:id', bundleController.getBundleById);

/**
 * @swagger
 * /bundles:
 *   post:
 *     summary: Create a new bundle
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Bundle'
 *     responses:
 *       201:
 *         description: Bundle created successfully
 *       400:
 *         description: Error creating bundle
 */
router.post('/', upload.single('image'), bundleController.createBundle);

/**
 * @swagger
 * /bundles/{id}:
 *   put:
 *     summary: Update an existing bundle
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bundle to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Bundle'
 *     responses:
 *       200:
 *         description: Bundle updated successfully
 *       404:
 *         description: Bundle not found
 */
router.put('/:id', upload.single('image'), bundleController.updateBundle);

/**
 * @swagger
 * /bundles/{id}:
 *   delete:
 *     summary: Delete a bundle
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the bundle to delete
 *     responses:
 *       200:
 *         description: Bundle deleted successfully
 *       404:
 *         description: Bundle not found
 */
router.delete('/:id', bundleController.deleteBundle);

module.exports = router;

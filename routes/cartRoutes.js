const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve the current cart
 *     responses:
 *       200:
 *         description: Details of the current cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.get('/', cartController.getCart);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Add products to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       200:
 *         description: Products added to the cart
 *       400:
 *         description: Error adding products to the cart
 */
router.post('/', cartController.addCart);

module.exports = router;

const router = require('express').Router()
const ProductController = require('../controller/product')

router.get('/', (_, res) => res.json({ message: "Hello Serverless !"}))

router.get('/products', ProductController.findAllProducts)
router.post('/products', ProductController.insertOneProduct)

module.exports = router
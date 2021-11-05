const fs = require('fs')

class ProductController {
  constructor (id, name, quantity, imageUrl) {
    this.id = id
    this.name = name
    this.quantity = +quantity,
    this.imageUrl = imageUrl
  }

  static findAllProducts (req, res) {
    fs.readFile('./product.json', 'utf8', (err, data) => {
      if (err) {
        res.status(400).json({ message: 'An error occured while read file data' })
      } else {
        res.status(200).json({ data: JSON.parse(data) })
      }
    })
  }
 
  static insertOneProduct (req, res) {
    fs.readFile('./product.json', 'utf8', (err, data) => {
      if (err) {
        res.status(400).json({ message: 'An error occured while read file data' })
      } else {
        const products = JSON.parse(data)
        let newId = 1
        if (products.length) newId = products[products.length - 1].id + 1
        const { name, quantity, imageUrl } = req.body
        const newProducts = new ProductController(newId, name, quantity, imageUrl)
        products.push(newProducts)
        fs.writeFile('./src/data/product.json', JSON.stringify(products, null, 2), (err) => {
          if (err) res.status(400).json({ message: 'An error occured while save file data' })
          else res.status(201).json({ message: 'Successfully created new product !', data: { id: newId }})
        })
      }
    })
  }

}

module.exports = ProductController
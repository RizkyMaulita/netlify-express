const { default: axios } = require('axios')
const express = require('express')
const serverless = require('serverless-http')
const app = express()
const router = express.Router()
router.get('/', (req, res) => {
  res.json({
    'hello': 'hi!'
  })
})

router.get('/post', (req, res) => {
  const hostname = req.hostname
  axios.get(`http://${hostname}:3000/posts`)
  .then(({ data }) => res.status(200).json({ data }))
  .catch(_ => res.status(500).json({ message: 'internal server error' }))
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)
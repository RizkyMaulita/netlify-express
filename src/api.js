const express = require('express')
const serverless = require('serverless-http')
const app = express()
const router = require('./routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)
const mongoose = require('mongoose')
const fs = require('fs')
const https = require('https')
const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const activateRouters = require('./config/activateRouters.js')
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') })


const MONGODB_CREDENTIALS = `${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}`
const MONGODB_ADDRESS = `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

mongoAssetsUrl = `mongodb://${MONGODB_CREDENTIALS}@${MONGODB_ADDRESS}/Assets?authSource=admin`
const app = express()
const port = process.env.SERVER_PORT
app.use(cors())
app.use(bodyParser.json())
activateRouters(app)

//simple connection
const connectToMongo = async () => {
    try {
      // console.log('Trying to connect to MongoDB ("Assets" database) @', mongoAssetsUrl)
      await mongoose.connect(mongoAssetsUrl, { useNewUrlParser: true });
      console.log('🚀 ~ Connected to MongoDB');
    } catch(error) {
      console.log('❌ ~ Error connection to MongoDB:', error.message);
    }
  };

connectToMongo()

//initialization of the api service
https
  .createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, "./config/server.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "./config/server.cert")),
    },
    app
  )
  .listen(port, function () {
    console.log(
      "👂 ~ API (HTTPS) server listening on port 3000..."
    );
  });
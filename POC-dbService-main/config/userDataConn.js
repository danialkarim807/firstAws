const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
const mongoose = require('mongoose')
const MONGODB_CREDENTIALS = `${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}`
const MONGODB_ADDRESS = `${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

//Creating a secondary connection to the user data DB.
mongoAssetsUrl = `mongodb://${MONGODB_CREDENTIALS}@${MONGODB_ADDRESS}/UserData?authSource=admin`
let userDataConn = mongoose.createConnection(mongoAssetsUrl, { useNewUrlParser: true })

module.exports = userDataConn
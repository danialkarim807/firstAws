const fs = require('fs')
rawData = fs.readFileSync('hrvData(1).txt').toString()
const reg = new RegExp('\[(.*?)\]')
const parsed =  rawData.match(reg)



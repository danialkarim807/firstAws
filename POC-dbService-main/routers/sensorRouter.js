const express = require("express");
const SensorData = require("../schema/sensorData.js");
const getDates = require("../helpers/dateManager.js");
const getLatestData = require('../helpers/getLatestData.js');
const validKeys = require("../middleware/validKeys.js");

const router = express.Router();

//Add a new sensor data document.
router.post("/sensorData", async (req, res) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).send(data);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Fetch all of the sensor data documents of a specific user.
router.get("/sensorData", validKeys.checkUserId, async (req, res) => {
  try {
    let userSensorData = [];
    const userId = req.query.userId;
    const date = req.query.date;

    //If no dates has been given return all of the user sensor data.
    if(!req.query.date) { 
      userSensorData = await SensorData.find({userId})
    } else {
      const [startDate, endDate] = getDates(date);
      userSensorData = await SensorData.find({timeStamp: { $gte: startDate, $lte: endDate },userId});
    }

    //If no data has been found.
    if (!userSensorData.length) {
      res.status(404).send("User data not found!");
    } else {
      res.status(200).send(userSensorData);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Fetch all of the latest sensor data documents for each sensor of a specific user.
router.get("/sensorData/last", validKeys.checkUserId, async(req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [GET /sensorData/last] Got request from IP: '${
        req.ip
      }' - Getting sensor last filled data: '${req.query.userId}'`
    );
    let sensorDataList = []
    let latestData = []
    sensorDataList = await SensorData.find({userId: req.query.userId})

    //If no data has been found.
    if (!sensorDataList.length) {
      res.status(404).send("Sensor data not found!")
    } else {
      let sensorIdList = [...new Set(sensorDataList.map(item => item.deviceUuid))];
      latestData = await getLatestData('sensor', sensorIdList, req.query.userId)
      res.status(200).send(latestData);
    }

  } catch (e) {
    res.status(400).send(e.message)
  }
})

module.exports = router;

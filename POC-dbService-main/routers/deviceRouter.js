const express = require("express");
const Device = require("../schema/devices.js");
const validKeys = require("../middleware/validKeys.js")

const router = express.Router();

//Add a new device to the database.
router.post("/device", async (req, res) => {
  try {
    console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [POST /device] Got request from IP: '${req.ip}' - Adding new device`)
    const device = new Device(req.body);
    await device.save();

    res.status(201).send(device);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Update an existing device.
router.patch("/device", validKeys.checkUuid, async (req, res) => {
  try {
    console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [PATCH /device] Got request from IP: '${req.ip}' - Updating existing device: '${req.query.uuid}'`)
    const targetUuid = { uuid: req.query.uuid };
    const updatedDevice = await Device.findOneAndUpdate(targetUuid, req.body);

    if (!updatedDevice) {
      res.status(404).send("Target device not found!");
    } else {
      res.status(201).send("Device info has been updated!");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Fetch an existing device.
router.get("/device", validKeys.checkUuid, async (req, res) => {
  try {
    console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [GET /device] Got request from IP: '${req.ip}' - Getting a device data: '${req.query.uuid}'`)
    const targetUuid = { uuid: req.query.uuid };
    const device = await Device.findOne(targetUuid);

    if (!device) {
      res.status(404).send("Target device not found!");
    } else {
      res.status(200).send(device);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Delete an existing device
router.delete("/device", validKeys.checkUuid, async (req, res) => {
  try {
    console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [DELETE /device] Got request from IP: '${req.ip}' - Deleting a device: '${req.query.uuid}'`)
    const targetUuid = { uuid: req.query.uuid };
    const device = await Device.deleteOne(targetUuid);

    if (!device) {
      res.status(404).send("Target device not found!");
    } else {
      res.status(201).send("Device has been deleted!");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;

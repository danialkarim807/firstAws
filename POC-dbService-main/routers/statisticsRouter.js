const express = require("express");
const getDates = require("../helpers/dateManager.js");
const validKeys = require("../middleware/validKeys.js");
const Statistics = require("../schema/statistics.js");

const router = express.Router();

//Create new statistics document.
router.post("/statistics", async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [POST /statistics] Got request from IP: '${
        req.ip
      }' - Adding new statistics data`
    );
    const statisticData = Statistics(req.body);
    await statisticData.save();
    // res.status(201).send("Statistics has been added!");
    res.status(201).send(statisticData);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Fetch statistics documents between dates.
router.get("/statistics", validKeys.checkUserId, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [GET /statistics] Got request from IP: '${
        req.ip
      }' - Getting statistics data: '${req.query.userId}'`
    );
    let statisticDataList = [];
    //If no dates has been given return all of the statistics
    if (!req.query.date) {
      statisticDataList = await Statistics.find({ userId: req.query.userId });
    } else {
      const [startDate, endDate] = getDates(req.query.date);
      statisticDataList = await Statistics.find({
        timeStamp: { $gte: startDate, $lte: endDate },
        userId: req.query.userId,
      });
    }

    //If no data has been found.
    if (!statisticDataList.length) {
      res.status(404).send("Statistics data not found!");
    } else {
      res.status(200).send(statisticDataList);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Update statistics document.
router.patch("/statistics", validKeys.checkUserId, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [PATCH /statistics] Got request from IP: '${
        req.ip
      }' - Updating existing statistics: '${req.query.userId}'`
    );

    const updatedStatistic = await Statistics.findOneAndUpdate(
      { userId: req.query.userId },
      req.body
    );
    if (!updatedStatistic) {
      res.status(404).send("Target statistics not found!");
    } else {
      res.status(201).send("statistics has been updated");
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/statistics", validKeys.checkUserId, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [DELETE /statistics] Got request from IP: '${
        req.ip
      }' - Deleting a statistics: '${req.query.userId}'`
    );
    const targetStatistic = await Statistics.findOneAndDelete({
      userId: req.query.userId,
    });

    if (!targetStatistic) {
      res.status(404).send("Target statistics not found!");
    } else {
      res.status(201).send("Statistics has been deleted!");
    }
  } catch (e) {}
});
module.exports = router;

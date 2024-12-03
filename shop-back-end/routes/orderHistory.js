const express = require("express");
const { getHistoryOrderById} = require("../controller/orderHistory");
const router = express.Router();

router.get("/getHistoryOrder/:id", getHistoryOrderById);

module.exports = router;

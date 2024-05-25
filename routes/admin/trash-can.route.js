const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/trash-can.controller");

router.get("/", controller.trashCan);

module.exports = router;
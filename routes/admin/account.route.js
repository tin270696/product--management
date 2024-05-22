const express = require("express");
const multer = require("multer");
const router = express.Router();

const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const accountValidate = require("../../validates/admin/account.validate");

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('avatar'),
    uploadCloud.uploadSingle,
    accountValidate.createPost,
    controller.createPost
)

module.exports = router;
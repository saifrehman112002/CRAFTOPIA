const express = require("express");
const { uploadImage } = require("../controller/image");
const router = express.Router();

const { uploadImage } = require("../controllers/image");


router.route("/upload-image").post(uploadImage);



module.exports = router;
const express = require("express");
const router = express.Router();
const Image = require("../model/image.js"); // Import your image model

// Middleware for handling file uploads
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Set your upload directory

// Save image to MongoDB

// exports.uploadImage = async (req, res, next) => {

//   const { imageUrl } = req.body;


//   const newImage = await Image.create({
//     imageUrl,
//   });

//   res.status(200).json({
//     success: true,
//     message: "Hero Section added Successfully",
//     newImage,
//   });
// };

router.post(
  "/upload-image",
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { imageUrl, vendor } = req.body;
      console.log("image Url : ", imageUrl);
      console.log("vendor : ", vendor);

      // Create a new Image document
      const newImage = await Image.create({
        imageUrl, // Assuming 'path' contains the path to your uploaded image
        vendor
      });

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully.",
        newImage,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
      console.error("error ===> ", error);
      // return next(error); 
    }
  }
);



// router.post(
//   "/upload-image",
//   upload.single("image"), // Assuming the field name in your form is 'image'
//   (req, res, next) => {
//     try {

//       const { imageUrl } = req.body;

//       // Create a new Image document
//       // console.log('req body', req.body);
//       const newImage = Image.create({
//         imageUrl, // Assuming 'path' contains the path to your uploaded image
//       });


//       // console.log("imageUrl ===> ", newImage.imageUrl);
//       // console.log("req body image ", req.body.image);

//       // Save the image to MongoDB
//       // newImage.save();
//       res.status(200).json({
//         success: true,
//         message: "Image uploaded successfully.",
//         newImage,
//       });
//     } catch (error) {
//       res.status(404).json({
//         success: true,
//         message: error,
//       });
//       console.log("error ===> ", error);
//       // return next(error); // Pass the error to the error handling middleware
//     }
//   }
// );

// Get images by vendor
router.get("/get-images-by-vendor/:vendor", async (req, res, next) => {
  try {
    const images = await Image.find({ vendor: req.params.vendor });
    res.status(200).json({
      success: true,
      images,
    });
  } catch (error) {
    return next(error); // Pass the error to the error handling middleware
  }
});

module.exports = router;

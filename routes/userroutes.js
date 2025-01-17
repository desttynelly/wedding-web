const express = require('express');
const router = express.Router();
const { signup, viewGuest } = require('../controller/usercontroller');
const multer = require('multer');

// Multer configuration for handling file uploads

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });



// Define routes
router.post('/signup', upload.single('image'), signup); // Handle image upload during signup
router.get('/user/:id', viewGuest); // View user by ID

module.exports = router;

const cloudinary = require('../public/cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require('../models/Guest'); // Ensure this path is correct
const QRCode = require('qrcode'); // Ensure you have this dependency installed








const signup = async (req, res) => {
    try {
      const { name, table, cameraImage } = req.body;
      let imageUrl;
  
      if (cameraImage) {
        // If cameraImage is provided, upload it to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(cameraImage, {
          upload_preset: 'ml_default',
        });
        imageUrl = uploadResult.secure_url;
      } else if (req.file) {
        // If a file is uploaded, handle it using Cloudinary
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: 'guests',
        });
        imageUrl = uploadResult.secure_url;
      } else {
        return res.status(400).send('No image provided');
      }
  
      // Save the user to the database
      const user = await User.create({ name, table, image: imageUrl });
  
       // Generate the QR code with a link to the user's page
    const webLink = `https://yourdomain.com/user/${user._id}`; // Replace with your domain
    const qrCodeImage = await QRCode.toDataURL(webLink);z
  
      // Render the QR code page with the generated QR code
      res.render('qr', { user, qrCodeImage });
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  };
  

  




const viewGuest = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the user by ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send('Guest not found');
        }

        // Render the user information page
        res.render('user', { user });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};

module.exports = { signup, viewGuest }; // Ensure both functions are now exported


// module.exports = { signup, viewGuest }; // Ensure signup is exported

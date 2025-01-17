const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userroutes');
const bodyParser = require('body-parser');
// const authRoutes = require("./routes/userroutes")

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{console.log("Database Connected")}).catch((err)=>{console.log(err)});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



require('dotenv').config();







const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./public/cloudinaryConfig');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'wedding_guests',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Or any storage option

// Routes
app.use('/', userRoutes);



// Routes
app.get('/', (req, res) => {
  res.render('signup'); // Render signup form
});

// app.use('/api/auth', authRoutes)

app.get('/user/:id', async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);

    if (!guest) {
      return res.status(404).send('Guest not found');
    }

    res.render('user', { guest });
  } catch (err) {
    res.status(500).send('Error fetching guest data: ' + err.message);
  }
});

// Start server
const PORT = process.env.PORT || 4300;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dpcsrmrxn', // Replace with your Cloudinary cloud name
  api_key: 934687145895717,       // Replace with your Cloudinary API key
  api_secret: 'AvPkWnT5riimLhvcy-DTHl1a9lA', // Replace with your Cloudinary API secret
});

// Configure Multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
  },
});

const upload = multer({ storage });

// API endpoint for file upload
app.post('/upload', upload.single('image'), (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || !req.file) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  console.log('Username:', username);
  console.log('Password:', password);
  console.log('Uploaded file:', req.file);

  res.status(200).json({
    message: 'File uploaded successfully!',
    fileUrl: req.file.path, // Cloudinary URL for the uploaded file
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

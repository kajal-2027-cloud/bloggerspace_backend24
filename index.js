const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const blogController = require('./controllers/blogController')
const multer = require('multer')
const fs = require("fs");
const path = require("path");

// to store the cokkies when the user logedin to store their data
const app = express()
const port = process.env.PORT 

//connect db
// can query non mentioned field in schema and return undefined if not exist 
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB has started successfully'))
.catch(err => console.error('Error connecting to MongoDB:', err));
// routes
app.use('/images', express.static('public/images'))
// app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)
// multer

const uploadDir = path.join(__dirname, "uploads");

const imageDir = path.join(__dirname, "public/images");

app.get('/health', (req, res) => {
  res.status(200).send('ok');
});


if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, req.body.filename)
    }   })
    // crete an uploader middleware
const upload = multer({
    storage: storage
})
app.post('/upload', upload.single("image"), async(req, res) => {
    return res.status(200).json({msg: "Successfully uploaded"})
})

// connect server
app.listen(port, () => console.log('Server has been started successfully', port))
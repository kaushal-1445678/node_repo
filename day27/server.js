const express = require('express');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        message: "File uploaded",
        file: req.file
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
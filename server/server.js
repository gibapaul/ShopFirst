const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    method: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
const port = process.env.PORT || 5000;

// In giá trị của MONGODB_URI
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Middleware để parse JSON và URL-encoded dữ liệu
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối đến cơ sở dữ liệu
dbConnect();

// Khởi tạo các route
initRoutes(app);

// Bắt đầu server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
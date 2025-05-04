import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes.js";
import bodyParser from "body-parser";
import mongoDB from "./config/database.js";
import authRoute from "./routes/authRoutes.js";
import contactRoute from "./routes/contactRoutes.js"
import logger from "./middleware/logger.js";
import projectRoute from "./routes/projectRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import multer from "multer";
import cors from "cors";

dotenv.config();
mongoDB();
connectCloudinary();


const app = express();
const port = process.env.PORT;
const upload = multer()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));
app.use(logger)
app.use(cors())
// const allowedOrigins = ['http://localhost:3000'];
// app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true // if you're using cookies
//   }));




app.get('/', (req, res) => {
    res.json({
        "name": "eprotfolio-backend",
        "version": "1.0.0",
        "author": "Sunil basnet",
        "license": "ISC",
        "port": port,
    })
})

app.use("/api/users", userRoute);
app.use("/api/profile/upload", upload.single("image"), userRoute);
app.use("/api/auth", authRoute);
app.use("/api/project", upload.single("image"), projectRoute);
app.use("/api/contact", contactRoute);

app.listen(port, () => {
    console.log(`Surver is running at port ${port}...`);
})
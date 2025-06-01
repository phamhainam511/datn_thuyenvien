import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine.js";
import initWebRoutes from './route/web.js';
import connectDB from './config/connectDb.js';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

viewEngine(app);
initWebRoutes(app);

app.use('/uploads', express.static('uploads'));

(async () => {
    try {
        await connectDB();

        const port = process.env.PORT || 6969;
        app.listen(port, () => {
            console.log("Backend Nodejs is running on the port: " + port);
        });
    } catch (error) {
        console.error("Failed to connect to DB:", error);
    }
})();
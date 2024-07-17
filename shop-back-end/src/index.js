import express from "express";
import cors from "cors"
import morgan from 'morgan';
import dotenv from "dotenv"
import Connectdb from "./config/dbConnect.js";
import Router from "./routes/index.js";

// config
dotenv.config()
const app = express();

// middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

//router
app.use("/api", Router);

// connect to db
Connectdb()

app.listen(process.env.PORT, () => {
	console.log('server running port 3000');
});
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config({ path: "config/config.env" })

// using middleware 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing routes
import userRoute from "./routes/user.routes.js";
import vendorRoute from "./routes/vendor.routes.js";

// //using routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/vendor", vendorRoute);

export default app;
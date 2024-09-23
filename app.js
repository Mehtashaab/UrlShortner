import express from "express";
import { router } from "./routes/url.route.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api',router)



export {app}

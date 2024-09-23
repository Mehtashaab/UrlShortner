import { Router } from "express";
import { createUser, getAnalytics, getUserUrl } from "../controllers/url.controller.js";
const router = Router();

 router.post('/url',createUser)
 router.get('/get-data/:shortId',getUserUrl)
 router.get("/analytics/:shortId",getAnalytics)

 export { router }
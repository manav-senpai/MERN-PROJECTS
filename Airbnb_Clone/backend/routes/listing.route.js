import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
// FIX: Added deleteListing to imports
import { addListing, getListing, findlistingByid, deleteListing } from "../controllers/listing.controller.js";

let listingRouter = express.Router();

listingRouter.post("/add", isAuth, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
]), addListing);

listingRouter.get("/get", getListing);
listingRouter.get("/findlistingByid/:id", findlistingByid);

// --- THIS WAS MISSING ---
listingRouter.delete("/delete/:id", isAuth, deleteListing);

export default listingRouter;
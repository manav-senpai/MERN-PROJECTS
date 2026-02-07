import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
    try {
        let host = req.userId;
        let { title, description, rent, city, landmark, category } = req.body;

        console.log("Files received:", req.files); 

        const img1LocalPath = req.files?.image1?.[0]?.path;
        const img2LocalPath = req.files?.image2?.[0]?.path;
        const img3LocalPath = req.files?.image3?.[0]?.path;

        if (!img1LocalPath) {
            return res.status(400).json({ message: "Primary image is required" });
        }

        let image1 = await uploadOnCloudinary(img1LocalPath);
        let image2 = img2LocalPath ? await uploadOnCloudinary(img2LocalPath) : "";
        let image3 = img3LocalPath ? await uploadOnCloudinary(img3LocalPath) : "";

        let listing = await Listing.create({
            title, description, rent, city, landmark, category,
            image1, image2, image3, host
        });

        let user = await User.findByIdAndUpdate(host, {
            $push: { listings: listing._id }
        }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json(listing);

    } catch (error) {
        console.error("Addlisting error:", error);
        res.status(500).json({ message: `Addlisting error: ${error.message}` });
    }
};

export const getListing = async (req, res) => {
    try {
        const listings = await Listing.find().sort({ createdAt: -1 });
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findlistingByid = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- THIS WAS MISSING ---
export const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndDelete(id);
        
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Remove from host's list
        await User.findByIdAndUpdate(listing.host, {
            $pull: { listings: id }
        });

        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findlisting = async (req, res) => {
    try {
        let {id} = req.params
        let listing = await Listing.findById(id)
        if(!listing){
            res.status(404).json({message:"Listing not found"})
        }
        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json(`findlisting error ${error.message} `)
    }
}

import mongoose from "mongoose"

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    rent: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    // FIX: Changed 'landMark' to 'landmark' (lowercase m) to match Frontend!
    landmark: { 
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            rating: { type: Number, required: true },
            comment: { type: String, default: "" }
        }
    ],
    averageRating: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Listing = mongoose.model("Listing", listingSchema)

export default Listing
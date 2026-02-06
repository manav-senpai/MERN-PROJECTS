import {v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary = async (filepath) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_API_KEY, 
        api_secret: CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    try {
        if(!filepath){
            return null
        }
        const uploadResult = await cloudinary.uploader
        .upload(filepath)
        fs.uplinkSync(filepath)
        return uploadResult



    } catch (error) {
        fs.unlinkSync(filepath)
        console.log(error)
    }
}

export default uploadOnCloudinary
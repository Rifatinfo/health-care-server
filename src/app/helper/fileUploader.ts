import multer from "multer";
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv";
import { envVars } from "../config/env";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), '/uploads'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: Express.Multer.File) => {
    cloudinary.config({
        cloud_name: envVars.cloud_name,
        api_key: envVars.api_key,
        api_secret: envVars.api_secret
    });

    const uploadResult = await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        }
        )
        .catch((error) => {
            console.log(error);
        });
    return uploadResult;
}

export const fileUploader = {
    upload,
    uploadToCloudinary
}
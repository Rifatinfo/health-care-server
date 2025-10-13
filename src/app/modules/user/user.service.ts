import { Request } from "express";
import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async (req : Request) => {
    if(req.file){
       const uploadResult = await fileUploader.uploadToCloudinary(req.file);
       req.body.patient.profilePhoto = uploadResult?.secure_url
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashPassword);
    
    const result = await prisma.$transaction(async (tnx) => {
         await tnx.user.create({
            data : {
                email : req.body.patient.email,
                password : hashPassword
            }
        })

        return await tnx.patient.create({
            // data : {
            //     name : req.body.name,
            //     email : req.body.email
            // }
            data : req.body.patient
        })
    })

    return result
}

export const UserService = {
    createPatient
}
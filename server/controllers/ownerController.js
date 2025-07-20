import User from "../models/User.js";
import Car from '../models/Car.js'
import fs from 'fs'


export const changeRoleToOwner =async(req,res)=>{
    try {
        const {_id}=req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "now you can list your cars"})
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}

//api to list car
export const addCar=async(req,res)=>{
    try {
        const {_id}=req.user;
        let car= JSON.parse(req.body.carData);
        const imageFile=req.file;

        //upload image to imagekit
        const fileBuffer=fs.readFileSync(imageFile.path)
        const response=await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // optimize through imagekit  URL transformation
        var optimizedImageUrl = imagekit.url({
          path : response.filePath,
          transformation : [
            { width : "1280" },
            {quality :"auto"},
            {format :"webp"}
            ]
        });

        const image=optimizedImageUrl;
        await Car.create({...car, owner:_id, image})
        res.json({success: true, message: "Car Added"})

    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}
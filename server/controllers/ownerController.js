import User from "../models/User.js";


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
        
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}
import Booking from "../models/Booking.js"
import Car from '../models/Car.js'


const checkAvailability = async(car, pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}

//api to check availability of cars for given date and location
export const checkAvailabilityOfCar=async(res,req)=>{
    try {
        const {location, pickupDate,returnDate}=req.body;

        const cars=await Car.find({location, isAvaliable: true})

        const availabileCarsPromises = cars.map(async(car)=>{
            const isAvaliable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car._doc, isAvaliable: isAvaliable}
        })

        let availabileCars=await Promise.all(availabileCarsPromises);
        availabileCars=availabileCars.filter(car=> car.isAvaliable === true)

        res.json({success: true, availabileCars})
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}
import Booking from "../models/Booking.js"


const checkAvailability = async(car, pickupDate,returnDate)=>{
    const bookings=await Booking.find({
        car,
        pickupDate:{$lte: returnDate},
        returnDate: {$gte: pickupDate},
    })
    return bookings.length === 0;
}
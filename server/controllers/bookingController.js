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

//api to create booking
export const createBooking=async(res,req)=>{
    try {
        const {_id}=req.user;
        const {location, pickupDate,returnDate}=req.body;

        const isAvaliable=await checkAvailability(car, pickupDate, returnDate)
        if (!isAvaliable) {
            res.json({success: false, message: "Car ia not available"})
        }

        const carData = await Car.findById(car)

        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned-picked)/(1000*60*60*24));
        const price = carData.pricePerDay*noOfDays;

        await Booking.create({car, owner: carData.owner, user:_id, pickupDate, returnDate, price})
        res.json({success: true, message: "Booking Created"})
       
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}

//api to list user bookings
export const getUserBookings=async(res,req)=>{
    try {
        const {_id}=req.user;

        const bookings=await Booking.find({user: _id}).populate("car").sort({createdAt : -1})

        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}

//api to get owner bookings
export const getOwnerBookings=async(res,req)=>{
    try {
        if (req.user.role !== 'owner') {
            return  res.json({success: flase, message: "Unauthorized"})
        }
        const bookings=await Booking.find({owner: req.user._id}).populate("car user").select("-user.password").sort({createdAt : -1})

        res.json({success: true, bookings})
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}

//api to change booking status
export const changeBookingStatus=async(res,req)=>{
    try {
        const {_id}=req.user;
        const {bookingId, status}=req.body;
        const booking=await Booking.findById(bookingId)

        if (booking.owner.toString() !== _id.toString()) {
            return  res.json({success: flase, message: "Unauthorized"})
        }
        
        booking.status=status;
        await booking.save();

        res.json({success: true, message: "Status Updated"})
    } catch (error) {
        console.log(error.message)
        res.json({success: flase, message: error.message})
    }
}
import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData,  } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageBookings = () => {
   const[bookings,setBookings]=useState([])
    const fetchOwnerBookings=async()=>{
      setCars(dummyMyBookingsData)
    }
    useEffect(()=>{
      fetchOwnerBookings
    },[])
  return (
    <div className=' px-4 py-10 md:px-10 w-full'>
      <Title title="Manage Bookings" subTitle="Track all customer bookings, approve or cancle requests, and manage booking status."/>
      
    </div>
  )
}

export default ManageBookings

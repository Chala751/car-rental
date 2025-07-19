import React, { useEffect, useState } from 'react'
import { dummyCarData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageCar = () => {

  const[car,setCar]=useState([])
  const fetchOwnerCars=async()=>{
    setCar(dummyCarData)
  }
  useEffect(()=>{
    fetchOwnerCars()
  },[])
  return (
    <div className=' px-4 py-10 md:px-10 w-full'>
      <Title title="Manage Cars" subTitle="View all listed cars, update their details, or remove them from the booking platform."/>
      
    </div>
  )
}

export default ManageCar

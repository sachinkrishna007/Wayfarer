import React from 'react'
// import NavBar from '../../../components/userComponents/navBar/NavBar'
import BookingTable from '../../../components/userComponents/table/table'
import { useState, useEffect } from 'react'
import { useGetBookingDataMutation } from '../../../redux/slices/userApiSlice'
import { useSelector } from 'react-redux'
import Heading from '../../../components/userComponents/Headings/heading'
import './BookingData.css'
import Navbar from '../../../components/Navbar/Navbar'
const BookingData = () => {
  const [bookingDataFromAPI, { isLoading }] = useGetBookingDataMutation()
  const [Data, setData] = useState([])
  const [mail, setEmail] = useState('')
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <div>
     <Navbar></Navbar>
      <Heading
        cName="hero"
        name="htext123"
        imageclass="cover123"
        img="https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"
        title="Booking Details"
      />

      <div className="userTable">
        <BookingTable className="tble" />
      </div>
    </div>
  )
}

export default BookingData

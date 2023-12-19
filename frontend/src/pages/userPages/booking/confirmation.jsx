import React, { useEffect } from 'react'

import Heading from '../../../components/userComponents/Headings/heading'
// import NavBar from '../../../components/userComponents/navBar/NavBar'
import { useConfirmBookingMutation } from '../../../redux/slices/userApiSlice'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsCheckCircle } from 'react-icons/bs'
import './confirmation.css'
const Confirmation = () => {
  const [confirmBooking] = useConfirmBookingMutation()
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')
    console.log(sessionId)
    const sendPayment = async () => {
      try {
        console.log('inside')
        const response = await confirmBooking({})

        console.log(response)
      } catch (error) {}
    }
    sendPayment()
  }, [])

  useEffect(() => {
    const changeStatus = async () => {
      try {
        const responseFromApiCall = await confirmBooking({})
      } catch (error) {}
    }
    changeStatus()
  }, [])

  return (
    <div>
      {/* <NavBar></NavBar> */}
      <Heading
        cName="hero"
        name="htext1234"
        img="https://cdn.dribbble.com/users/1751799/screenshots/5512482/check02.gif"
        imageclass="cover1234"
        title="Booking Sucesss"
        text="Wait for confirmation from guide "
      />{' '}
      <div className="confirmation-container">
        <BsCheckCircle className="confirmation-icon" />
      </div>
    </div>
  )
}

export default Confirmation

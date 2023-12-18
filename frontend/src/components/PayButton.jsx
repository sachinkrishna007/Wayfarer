import { Button } from 'primereact/button'
import { useStripeBookingMutation } from '../redux/slices/userApiSlice'
import { useGetBookingMutation } from '../redux/slices/userApiSlice'
import { useSelector } from 'react-redux'
import React from 'react'
import { useEffect } from 'react'

const url = '/api/stripe/create-checkout-session'
const PayButton = ({
  userid,
  guideid,
  Location,
  startDate,
  endDate,
  userEmail,
  guideName,
  Days,
  totalAmount,
  guideImage,
  userName
}) => {
  const [Stripe, { isLoading }] = useStripeBookingMutation()
    const { userInfo } = useSelector((state) => state.auth)
  const [createBooking] = useGetBookingMutation()
  
  const handleCheckout = async () => {
    try {
      const responseFromApiCall = await Stripe({
        userid,
        guideid,
        Location,
        startDate,
        endDate,
        userEmail,
        guideName,
        Days,
        totalAmount,
        userName
      })
    
    

      const response = await createBooking({
        userid,
        guideid,
        Location,
        startDate,
        endDate,
        userEmail,
        guideName,
        Days,
        totalAmount,
        guideImage,
        userName,
        payementType:'online'
      })
      if (response) {
        localStorage.removeItem('bookingData')
        window.location.href = responseFromApiCall.data.url
       
         
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
        
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        severity="success"
        onClick={() => handleCheckout()}
      >
        Pay Online
      </Button>
    </div>
  )
}

export default PayButton

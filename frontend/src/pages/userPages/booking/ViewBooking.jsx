import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/userComponents/navBar/navBar'

import { Button } from 'primereact/button'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Chip } from 'primereact/chip'
import { Navigate } from 'react-router-dom'
import 'primeflex/primeflex.css'
import {
  useGetUserBookingMutation,
  useCreateChatRoomMutation,
} from '../../../redux/slices/userApiSlice'
import { useSelector } from 'react-redux'
import Loader from '../../../components/userComponents/loading'
import Rating from '../Rating/Rating'
const ViewBooking = () => {
  const [loading, setLoading] = useState(true)
  const [BookingData, setBookingData] = useState('')
  const [bookingData] = useGetUserBookingMutation()
  const [createRoom, { isloading }] = useCreateChatRoomMutation()
  const id = location.pathname.split('/')[2]
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await bookingData({
          bookingId: id,
        })
        const booking = await responseFromApiCall.data.bookingData

        setBookingData(booking)
        setLoading(false)
      }

      fetchData()
    } catch (error) {
      toast.error(error)

      console.error('Error fetching users:', error)
    }
  })
  if (loading) {
    return <Loader></Loader>
  }

  const chatHandler = async () => {
    const responseFromApiCall = await createRoom({
      userId: userInfo._id,
      guideId: BookingData.guideid,
    })
    if (responseFromApiCall) {
      navigate(`/UserChat/${responseFromApiCall.data._id}`)
    }
  }
  return (
    <div>
      <NavBar></NavBar>
      <div style={{ padding: '90px' }}>
        <div className="surface-0">
          <div className="font-medium text-3xl text-900 mb-3">
            Booking Details
          </div>
          <div className="mr-2 mb-2">
            <img
              src={
                BookingData.guideImage
                  ? BookingData.guideImage
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt="Guide"
              className="rounded-full w-1 h-9 "
            />
          </div>
          <ul className="list-none p-0 m-0">
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Guide Name</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {BookingData.guidename}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Amount Paid</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {BookingData.totalAmount}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Location</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {BookingData.location}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Start Date</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {moment(BookingData.startDate).format('LL')}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">End Date</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {moment(BookingData.endDate).format('LL')}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">
                Booking Date
              </div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {moment(BookingData.createdAt).format('LL')}
              </div>
            </li>
          </ul>
          <div className="  mr-2">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
              }}
            >
              <Button
               
                severity="help"
                onClick={chatHandler}
               
              >Message Guide</Button>
              <div style={{ marginLeft: '30px' }}>
                <Rating
                  guideId={BookingData.guideid}
                  userId={userInfo._id}
                  userName={userInfo.firstName}
                  userimage={userInfo.profileImageName}
                ></Rating>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  )
}


export default ViewBooking;

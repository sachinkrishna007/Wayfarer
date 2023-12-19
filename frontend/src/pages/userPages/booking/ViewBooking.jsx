import React, { useEffect, useState } from 'react'
// import NavBar from '../../../components/userComponents/navBar/NavBar'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import 'primeflex/primeflex.css'
import { useCancelBookingMutation } from '../../../redux/slices/userApiSlice'

import {
  useGetUserBookingMutation,
  useCreateChatRoomMutation,
} from '../../../redux/slices/userApiSlice'
import { useSelector } from 'react-redux'
import Loader from '../../../components/userComponents/loading'
import Rating from '../Rating/Rating'
import { toast } from 'react-toastify'
const ViewBooking = () => {
  const [loading, setLoading] = useState(true)
  const [BookingData, setBookingData] = useState('')
  const [bookingData] = useGetUserBookingMutation()
  const [cancelBooking, { isLoading }] = useCancelBookingMutation()
  const [createRoom, { isloading }] = useCreateChatRoomMutation()
  const id = location.pathname.split('/')[2]
  const [showModal, setShowModal] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const fetchData = async () => {
    const responseFromApiCall = await bookingData({
      bookingId: id,
    })
    const booking = await responseFromApiCall.data.bookingData

    setBookingData(booking)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const CancelBookingUser = async () => {
    try {
      const response = await cancelBooking({
        bookingId: BookingData._id,
        userId: userInfo._id,
      }).unwrap()
      if (response) {
        fetchData()
        toast(
          'Booking successfully cancelled! The Amount will be shortly refunded to your Wallet',
          {
            position: 'top-center',
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          },
        )
        setShowModal(false)
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message)
      } else {
        toast.error(' Balance')
      }
    }
  }

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
      {/* <NavBar></NavBar> */}

      <div style={{ padding: '90px' }}>
        {BookingData.status === 'Accepted' && ( // Check the booking status here
          <Button
            severity="danger"
            style={{ float: 'right', borderRadius: '20px' }}
            onClick={(e) => {
              setShowModal(true)
            }}
          >
            Cancel Booking
          </Button>
        )}

        <div className="surface-0">
          <div className="font-medium text-4xl text-900 mb-3">
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
            <br />
            <br />
            {BookingData.status === 'cancelled' && (
              <h4 style={{ color: 'red' }}>This booking has been cancelled</h4>
            )}
            {BookingData.status === 'Guidecancelled' && (
              <h5 style={{ color: 'red' }}>
                This booking has been cancelled by the Guide your Amount will be
                refunded
              </h5>
            )}
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
                Booking Status
              </div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {BookingData.status === 'cancelled'
                  ? 'User canceled'
                  : BookingData.status === 'Guidecancelled'
                    ? 'Booking was cancelled from guide Side'
                    : BookingData.status}
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
              {BookingData.status === 'Accepted' && ( // Check the booking status here
                <Button severity="help" onClick={chatHandler}>
                  Message Guide
                </Button>
              )}
              {BookingData.status === 'Accepted' && ( // Check the booking status here
                <div style={{ marginLeft: '30px' }}>
                  <Rating
                    guideId={BookingData.guideid}
                    userId={userInfo._id}
                    userName={userInfo.firstName}
                    userimage={userInfo.profileImageName}
                  ></Rating>
                </div>
              )}
            </div>
          </div>

          <div></div>
        </div>
      </div>
      <Dialog
        visible={showModal}
        style={{ width: '30%' }}
        onHide={() => setShowModal(false)}
        header="Confirm Cancel Request"
        modal
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowModal(false)}
              style={{ backgroundColor: '#FF5733', marginRight: '10px' }}
            />
            <Button
              label="Accept"
              icon="pi pi-check"
              onClick={CancelBookingUser}
              disabled={isLoading}
              style={{ backgroundColor: '#4CAF50' }}
            />
          </div>
        }
      >
        <p>
          Are You Sure You Want to cancel only 50% of amount will be refunded{' '}
        </p>
      </Dialog>
    </div>
  )
}

export default ViewBooking

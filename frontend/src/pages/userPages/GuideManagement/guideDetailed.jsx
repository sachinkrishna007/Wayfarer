import NavBar from '../../../components/userComponents/navBar/navBar'
import './guideDetailed.css'
import Footer from '../../../components/userComponents/footer/footer'
import DatePicker from 'react-datepicker'
import { Calendar } from 'primereact/calendar'
import { useState, useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import Loader from '../../../components/userComponents/loading'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Chip } from 'primereact/chip'
import { Knob } from 'primereact/knob'
import { Sidebar } from 'primereact/sidebar'
import { Link } from 'react-router-dom'
import { useGetRatingsMutation } from '../../../redux/slices/userApiSlice'
import {
  useCheckAvilablityGuideMutation,
  useGetBookedDatesMutation,
} from '../../../redux/slices/userApiSlice'

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit'
import { useGetSingleGuideMutation } from '../../../redux/slices/userApiSlice'

import { toast } from 'react-toastify'
export default function EditButton() {
  const [loading, setLoading] = useState(true)
  const [ratingLoading, setRatingLoading] = useState(true)
  const [startDate, setStartDate] = useState('')
  const [availabilityStatus, setAvailabilityStatus] = useState('')
  const [endDate, setEndDate] = useState('')
  const id = location.pathname.split('/')[2]
  const [guideSingleDataFromAPI] = useGetSingleGuideMutation()
  const [overlappingDates] = useCheckAvilablityGuideMutation()
  const [getRatings] = useGetRatingsMutation()
  
  const [averageRating, setAverageRating] = useState(0)

  const [guideData, setGuideData] = useState('')
  const [rating, setGuiderating] = useState('')
  const { userInfo } = useSelector((state) => state.auth)
  const [booking, setBooking] = useState('')
  const [bookingCount, setBookingCount] = useState(0)
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [bookedDates, setBookedDates] = useState([])
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await guideSingleDataFromAPI({
          guideId: id,
        })

        const guide = await responseFromApiCall.data.guideData

        setGuideData(guide)
        setLoading(false)
      }

      fetchData()
    } catch (error) {
      toast.error(error)

      console.error('Error fetching users:', error)
    }
  }, [])



  useEffect(() => {
    try {
      const fetchRating = async () => {
        const responseFromApiCall = await getRatings({
          guideId: id,
        })

        const rating = await responseFromApiCall.data.comment
        const bookingCount = await responseFromApiCall.data.booking
        setGuiderating(rating)
        setBooking(bookingCount)
        setRatingLoading(false)

        if (rating.length > 0) {
          const totalRating = rating.reduce(
            (sum, comment) => sum + comment.rating,
            0,
          )
          const avgRating = totalRating / rating.length
          setAverageRating(avgRating)
        }
      }

      fetchRating()
    } catch (error) {
      toast.error(error)

      console.error('Error fetching data:', error)
    }
  }, [])

  useEffect(() => {
    if (booking.length > 0) {
      const totalBooking = booking.length
      setBookingCount(totalBooking)
    }
  })

  if (loading) {
    return <Loader></Loader>
  }
  if (ratingLoading) {
    return <Loader></Loader>
  }

  const checkAvailability = async () => {
    if (!startDate || !endDate) {
      toast.warning('Please add dates')
      return
    }
    try {
      const availabilityStatus = await overlappingDates({
        startDate,
        endDate,
        guideId: guideData._id,
      }).unwrap()

      if (availabilityStatus) {
        const bookingData = {
          startDate,
          endDate,
          guideName: `${guideData.firstname} ${guideData.Lastname}`,
          guideId: guideData._id,
          userId: userInfo._id,
          userEmail: userInfo.email,
          guidePrice: guideData.price,
          guideLocation: guideData.Location,
          guideProfile: guideData.profileImage,
        }

        localStorage.setItem('bookingData', JSON.stringify(bookingData))

        navigate('/bookingPage')
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="gradient-custom-2">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="12" xl="12">
              <MDBCard>
                <div className="rounded-top text-dark d-flex flex-row">
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: '150px' }}
                  >
                    <MDBCardImage
                      src={guideData.profileImage}
                      alt="Generic placeholder image"
                      className="mt-6  img-thumbnail guideimage"
                      fluid
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: '130px' }}>
                    <MDBTypography tag="h2" className="guideName">
                      {' '}
                      {guideData.firstname} {guideData.Lastname}
                    </MDBTypography>
                    <MDBCardText className="guideLoc" tag="h6">
                      {guideData.Location}
                    </MDBCardText>
                  </div>
                  <div className="justify-content-center knob1">
                    {averageRating > 0 ? (
                      <Knob
                        value={Math.round(averageRating)} // Rounded value
                        max={10}
                        valueColor={averageRating > 5 ? '#228B22' : '#FF5733'}
                      />
                    ) : (
                      <p>Not Rated</p>
                    )}
                    <h6 style={{ paddingLeft: '25px' }}>Rating</h6>
                  </div>

                  <div className=" knob2">
                    {bookingCount > 0 ? (
                      <Knob value={bookingCount} />
                    ) : (
                      <p>0</p>
                    )}
                    <h6 style={{ paddingLeft: '1px' }}>Completed trips </h6>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div></div>
                    <div className="px-3"></div>
                  </div>
                </div>
                <div className="font-medium text-3xl text-900 mb-3">
                  More Information
                </div>
                <div className="text-500 mb-5">
                  Morbi tristique blandit turpis. In viverra ligula id nulla
                  hendrerit rutrum.
                </div>

                <ul className="list-none p-0 m-0">
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">
                      About me
                    </div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {guideData.Description}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">
                      Languages
                    </div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {guideData.Language.map((language, index) => (
                        <Chip
                          key={index}
                          label={language}
                          className={
                            index < guideData.Language.length - 1 ? 'mr-2' : ''
                          }
                        />
                      ))}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">Email</div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {guideData.email}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">
                      Guide Charge
                    </div>
                    <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                      {guideData.price}
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">
                      Start Date
                    </div>
                    <div className="mb-2">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                      />
                    </div>
                  </li>
                  <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                    <div className="text-500 w-6 md:w-2 font-medium">
                      End Date
                    </div>
                    <div className="mb-2">
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        className="form-control"
                      />
                    </div>
                  </li>
                  <div className="mb-2">
                    <Button
                      onClick={checkAvailability}
                      severity="success"
                      raised
                    >
                      Continue Booking
                    </Button>

                    <span className="ml-2">{availabilityStatus}</span>

                    <Button
                      onClick={() => setVisible(true)}
                      style={{ float: 'right' }}
                    >
                      View Reviews
                    </Button>
                  </div>

                  <li>
                    <div className=" justify-content-center">
                      <Sidebar
                        visible={visible}
                        style={{ width: '70%' }}
                        position="right"
                        onHide={() => setVisible(false)}
                      >
                        {rating.length === 0 ? (
                          <section>
                            <p>No reviews available.</p>
                          </section>
                        ) : (
                          <>
                            <MDBTypography tag="h0" className="mb-0">
                              Recent comments
                            </MDBTypography>
                            <p className="fw-light mb-4 pb-2">
                              Latest Comments section by users
                            </p>
                            {rating.map((data) => (
                              <section key={data._id}>
                                <MDBContainer
                                  className="py-5"
                                  style={{ maxWidth: '1000px' }}
                                >
                                  <MDBRow className="justify-content-center">
                                    <MDBCol md="12" lg="10">
                                      <MDBCard className="text-dark">
                                        <MDBCardBody>
                                          <div className="d-flex flex-start">
                                            <MDBCardImage
                                              className="rounded-circle shadow-1-strong me-3"
                                              src={
                                                data.userImage
                                                  ? data.userImage
                                                  : 'https://cdn-icons-png.flaticon.com/512/1253/1253756.png'
                                              }
                                              alt="avatar"
                                              width="60"
                                              height="60"
                                            />
                                            <div>
                                              <MDBTypography
                                                tag="h6"
                                                className="fw-bold mb-1"
                                              >
                                                {data.userName}
                                              </MDBTypography>
                                              <div className="d-flex align-items-center mb-3">
                                                <p className="mb-0">
                                                  {new Date(
                                                    data.createdAt,
                                                  ).toLocaleDateString()}
                                                </p>
                                                {/* Add your other icons and actions here */}
                                              </div>
                                              <p className="mb-0">
                                                {data.comment}
                                              </p>
                                            </div>
                                          </div>
                                        </MDBCardBody>
                                        <hr className="my-0" />
                                      </MDBCard>
                                    </MDBCol>
                                  </MDBRow>
                                </MDBContainer>
                              </section>
                            ))}
                          </>
                        )}
                      </Sidebar>
                    </div>
                  </li>
                </ul>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <div></div>
      <Footer></Footer>
    </div>
  )
}

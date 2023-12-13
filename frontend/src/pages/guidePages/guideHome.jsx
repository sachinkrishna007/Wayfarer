import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../components/guideComponents/navbar/GuideNavbar'
import { useSelector } from 'react-redux'
import { useGuideGetDataMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import './guideHome.css'
import Loader from '../../components/userComponents/loading'
import Heading from '../../components/userComponents/Headings/heading'
import { useGuideActivateMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import { Chip } from 'primereact/chip'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit'

import { toast } from 'react-toastify'
import { Button } from 'primereact/button'
export default function GuideHome() {
  const [guideData, setGuideData] = useState([])
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const [guideDataFromAPI] = useGuideGetDataMutation()
  const [ActivateGuide] = useGuideActivateMutation()
  const [loading, setLoading] = useState(true)
  useEffect(
    () => {
      try {
        const fetchData = async () => {
          const responseFromApiCall = await guideDataFromAPI({
            guideId: guideInfo.data.email,
          })

          const guideArray = responseFromApiCall.data.guideData

          setGuideData(guideArray[0])
          setLoading(false)
        }

        fetchData()
      } catch (error) {
        toast.error(error)

        console.error('Error fetching users:', error)
      }
    },
    [],
    guideData,
  )

  const ActivateHandler = async () => {
try {
   const responseFromApiCall = await ActivateGuide({
     guideId: guideInfo.data._id,
   }).unwrap()
   if (responseFromApiCall) {
      toast.success(
        `Successfully ${guideData.isActive ? 'deactivated' : 'activated'}`,
      )
      setGuideData((prevGuideData) => ({
        ...prevGuideData,
        isActive: !prevGuideData.isActive,
      }))
   }
} catch (err) {
   if (err.data && err.data.message) {
     toast.error(err.data.message)
   } else {
     toast.error('An error occurred. Please try again.') // Generic error message
   }
}
   
  }
  if (loading) {
    return <Loader></Loader>
  }
  const languages = guideData.Language > 0 ? guideData[0].Language : []
  return (
    <>
      <NavBar />
      <Heading
        cName="hero"
        name="htext123"
        imageclass="coverProfile"
        img="https://t3.ftcdn.net/jpg/01/91/95/30/240_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"
        title="Profile"
        text="Treat your guests as if they were your own family."
      />

      <MDBContainer className="py-5  container">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={guideData.profileImage}
                  alt="avatar"
                  className="square"
                
                  style={{  height:"200px" }}
                  fluid
                />
                {/* <p className="text-muted mb-1">{guideInfo.data.firstName}</p>
                 */}
                {/* <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div> */}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: '#333333' }}
                    />
                    <Link
                      to={'/guideAddData'}
                      className="genric-btn info w-50 mx-auto "
                    >
                      <MDBBtn style={{ backgroundColor: '#387F8E' }}>
                        ADD/Edit DETAILS
                      </MDBBtn>
                    </Link>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3 ">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: '#55acee' }}
                    />

                    <Link
                      to={'/guideChangePassword'}
                      className="genric-btn info w-50 mx-auto "
                    >
                      <MDBBtn style={{ backgroundColor: '#387F8E' }}>
                        ChangePassword
                      </MDBBtn>
                    </Link>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {`${guideInfo.data.firstName} ${guideInfo.data.lastName} `}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {guideInfo.data.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {guideInfo.data.mobile}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Preferred Location</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {guideInfo.data.Location}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Guide Charge</MDBCardText>
                  </MDBCol>

                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <h6>
                        ₹
                        {guideData.price ? (
                          guideData.price
                        ) : (
                          <p style={{ color: 'red' }}>Please add price</p>
                        )}
                      </h6>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Languages</MDBCardText>
                  </MDBCol>

                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <div>
                        {guideData.Language && guideData.Language.length > 0 ? (
                          guideData.Language.map((language, index) => (
                            <Chip
                              key={index}
                              label={language}
                              className={
                                index < guideData.Language.length - 1
                                  ? 'mr-2'
                                  : ''
                              }
                            />
                          ))
                        ) : (
                          <p style={{ color: 'red' }}>
                            Complete your profile by adding languages.
                          </p>
                        )}
                      </div>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Activities</MDBCardText>
                  </MDBCol>

                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <div>
                        {guideData.category && guideData.category.length > 0 ? (
                          guideData.category.map((cat, index) => (
                            <Chip
                              key={index}
                              label={cat}
                              className={
                                index < guideData.category.length - 1
                                  ? 'mr-2'
                                  : ''
                              }
                            />
                          ))
                        ) : (
                          <p style={{ color: 'red' }}>
                            Complete your profile by adding Activites.
                          </p>
                        )}
                      </div>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Description</MDBCardText>
                  </MDBCol>

                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {guideData.Description ? (
                        guideData.Description
                      ) : (
                        <p style={{ color: 'red' }}>
                          Please add Description activate your account
                        </p>
                      )}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                <Button
                  onClick={ActivateHandler}
                  className="btn btn-primary"
                  style={{
                    backgroundColor: guideData.isActive ? '#cf1515' : 'green',

                    marginTop: '30px',
                  }}
                >
                  {guideData.isActive
                    ? 'Deactivate Your Account'
                    : 'Activate Your Account'}
                </Button>
              </MDBCardBody>
            </MDBCard>
            <MDBRow className="mt-4"></MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* <div className="d-flex justify-content-between align-items-center mb-4">
        <MDBCardText className="lead fw-normal mb-0">
          Recent Travel Pictures & Experience
        </MDBCardText>
        <MDBCardText className="mb-0">
          <a href="#!" className="text-muted">
            Show all
          </a>
        </MDBCardText>
      </div> */}

      {/* <MDBRow>
        <MDBCol md="4" className="mb-4">
          <MDBCardImage
            src="https://images.unsplash.com/photo-1496566084516-c5b96fcbd5c8?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 1"
            className="w-100 rounded-3"
          />
          <MDBCardText className="mt-2">My recent trip</MDBCardText>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCardImage
            src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 1"
            className="w-100 rounded-3"
          />
          <MDBCardText className="mt-2">the best one</MDBCardText>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCardImage
            src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image 1"
            className="w-100 rounded-3"
          />
          <MDBCardText className="mt-2">All time best</MDBCardText>
        </MDBCol>
      </MDBRow> */}
    </>
  )
}

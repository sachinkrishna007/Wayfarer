import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../components/guideComponents/navbar/GuideNavbar'
import { useSelector } from 'react-redux'
import { useGuideGetDataMutation, useGuideUpdateProfileMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import './guideHome.css'
import Loader from '../../components/userComponents/loading'
import Heading from '../../components/userComponents/Headings/heading'
import { useGuideActivateMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import { Chip } from 'primereact/chip'
import { Sidebar } from 'primereact/sidebar'
import { InputText } from 'primereact/inputtext'
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
  const [visible, setVisible] = useState(false)
   const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [Location,setLocation ] = useState('')
  const [profileImage, setprofileImage] = useState(null)
  const [CoverPic, setCoverPic] = useState(null)
  const [loading, setLoading] = useState(true)
   const [updateProfile] = useGuideUpdateProfileMutation()

    const fetchData = async () => {
      const responseFromApiCall = await guideDataFromAPI({
        guideId: guideInfo.data.email,
      })

      const guideArray = responseFromApiCall.data.guideData

      setGuideData(guideArray[0])
      setFirstName(guideData.firstname)
      setLastName(guideData.LastName)
      setLocation(guideData.Location)
      setMobile(guideData.mobile)
      setLoading(false)
    }


  useEffect(()=>{
    fetchData()
  },[])
  





   const handleSubmit = async (e) => {
     e.preventDefault()
     console.log("here");
     try {
       const response = await updateProfile({
         email:guideInfo.data.email,
         firstName,
         LastName,
         mobile,
         profileImage,
         CoverPic,
         Location
       })

       if (response) {
          console.log(response);
          fetchData()

         toast.success('Successfully updated')
       } else {
         toast.error('An error occurred. Please try againn.') // Generic error message
       }
     } catch (err) {
       if (err.data && err.data.message) {
         toast.error(err.data.message)
       } else {
         toast.error('An error occurred. Please try again.')
       }
     }
   }
 const handleprofImage = (e) => {
   const file = e.target.files[0]
   setFileToBase1(file)
 } 
  const setFileToBase1 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setprofileImage(reader.result)
    }
  }
 const handlecoverImage = (e) => {
   const file = e.target.files[0]
   setFileToBase2(file)
 } 
  const setFileToBase2 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setCoverPic(reader.result)
    }
  }
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
                  style={{ height: '170px', borderRadius: '20px' }}
                  fluid
                />
                <Button
                  icon="pi pi-user-edit"
                  style={{
                    height: '10px',
                    color: 'black',
                    backgroundColor: 'white',
                    border: 'none',
                  }}
                  onClick={() => setVisible(true)}
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
                      {`${guideData.firstname} ${guideData.Lastname} `}
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
                      {guideData.email}
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
                      {guideData.mobile}
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
                      {guideData.Location}
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

      <div className="card flex justify-content-center ">
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          fullScreen
          style={{
            padding: '20px ',
            margin: '100px',
            marginTop: '100px',
            marginBottom: '200px',
          }}
        >
          <div className="surface-0">
            <div className="font-medium text-3xl text-900 mb-3">
              Update Your Profile
            </div>
            <form onSubmit={handleSubmit}>
              <ul className="list-none p-0 m-0">
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Update First Name
                  </div>
                  <div className="card flex justify-content-center">
                    <InputText
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Update Last Name
                  </div>
                  <div className="card flex justify-content-center">
                    <InputText
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Update Mobile
                  </div>
                  <div className="card flex justify-content-center">
                    <InputText
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </li>

                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Update Location
                  </div>
                  <div className="card flex justify-content-center">
                    <InputText
                      value={Location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Update Profile Image
                  </div>
                  <div className="card flex justify-content-center">
                    <input
                      type="file"
                      id="profileimage"
                      accept=".jpg, .jpeg, .png, .pdf,.avif"
                      onChange={handleprofImage}
                    />
                  </div>
                </li>
                {/* <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Add Cover Photo
                  </div>
                  <div className="card flex justify-content-center">
                    <input
                      type="file"
                      id="profileimage"
                      accept=".jpg, .jpeg, .png, .pdf,.avif"
                      onChange={handlecoverImage}
                    />
                  </div>
                </li> */}
              </ul>
              <Button type="submit">Update Profile</Button>
            </form>
          </div>
        </Sidebar>
      </div>
    </>
  )
}

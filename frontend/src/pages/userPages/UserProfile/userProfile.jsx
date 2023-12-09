import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../../components/userComponents/navBar/navBar'
import { Sidebar } from 'primereact/sidebar'
import { useSelector } from 'react-redux'
import Heading from '../../../components/userComponents/Headings/heading'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'

import {
  useUpdateProfileMutation,
  useGetProfileMutation,
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
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from 'mdb-react-ui-kit'
import { toast } from 'react-toastify'
import Loader from '../../../components/userComponents/loading'

export default function UserProfile() {
  const [userData, setUserData] = useState('')
  const { userInfo } = useSelector((state) => state.auth)
  const [visible, setVisible] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setprofileImage] = useState(null)
  const [updateProfile] = useUpdateProfileMutation()
  const [getProfile] = useGetProfileMutation()
   const [loading, setLoading] = useState(true)
 

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }
 const fetchUserProfile = async (e) => {

   const responseFromApiCall = await getProfile({ email: userInfo.email })
   if (responseFromApiCall) {
     console.log(responseFromApiCall.data.user)
     console.log(responseFromApiCall)
 const { firstName, LastName, email, mobile, profileImageName } =
   responseFromApiCall.data.user
        setUserData({
          firstName,
          LastName,
          email,
          mobile,
          profileImageName,
        })
    //  setFirstName(responseFromApiCall.data.user.firstName)
    //  setLastName(responseFromApiCall.data.user.LastName)
    //  setMobile(responseFromApiCall.data.user.mobile)
     setLoading(false)
     console.log(userData)
   }
 }
 useEffect(() => {
  
    fetchUserProfile()
    console.log('Component updated with new user data:', userData)
  }, [])

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setprofileImage(reader.result)
    }
  }
  const handleSubmit = async () => {
    
    try {
      

      const response = await updateProfile({
        email: userInfo.email,
        firstName,
        LastName,
        mobile,
        profileImage,
      })

      if (response && response.data) {
        // Assuming the response contains a "data" property, adjust as needed
        toast.success('Successfully updated')
      } else {
        toast.error('An error occurred. Please try again.') // Generic error message
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

  return (
    <>
      <br />
      <br />
      <br />
      <NavBar />
      <div style={{ padding: '0px 100px' }}>
        <Heading
          cName="hero"
          name="htext123"
          imageclass="coverUser"
          img="https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-company-profile-corporate-culture-exhibition-board-display-poster-material-image_131622.jpg"
          title="Your Profile"
        />
      </div>

      <MDBContainer className="py-5  container">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
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
                          {/* <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                          <div className="text-500 w-6 md:w-2 font-medium">
                            email
                          </div>

                          <div className="card flex justify-content-center">
                            <InputText
                              value={userInfo.email}
                              onChange={(e) => setValue(e.target.value)}
                            />
                          </div>
                        </li> */}
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
                              Update Profile Image
                            </div>
                            <div className="card flex justify-content-center">
                              <input
                                type="file"
                                id="profileimage"
                                accept=".jpg, .jpeg, .png, .pdf,.avif"
                                onChange={handleImage}
                              />
                            </div>
                          </li>
                        </ul>
                        <Button type="submit">Update Profile</Button>
                      </form>
                    </div>
                  </Sidebar>
                </div>
                <MDBCardImage
                  src={userData.profileImageName}
                  alt="avatar"
                  className="square"
                  style={{
                    width: '200px',
                    borderRadius: '40%',
                    marginTop: '-100px',
                  }}
                  fluid
                />
                <Button
                  icon="pi pi-user-edit"
                  style={{ height: '1px' }}
                  onClick={() => setVisible(true)}
                />
              </MDBCardBody>
            </MDBCard>
            {/* <MDBCard className="mb-4 mb-lg-0">
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
            </MDBCard>  */}
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
                      {`${userData.firstName} ${userData.LastName} `}
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
                      {userData.email}
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
                      {userData.mobile ? userData.mobile : 'not available'}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
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

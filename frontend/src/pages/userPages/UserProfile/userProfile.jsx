import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import NavBar from '../../../components/userComponents/navBar/NavBar'
import { Sidebar } from 'primereact/sidebar'
import { useSelector } from 'react-redux'
import Heading from '../../../components/userComponents/Headings/heading'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Image } from 'primereact/image'
import { InputText } from 'primereact/inputtext'

import {
  useUpdateProfileMutation,
  useUsergetProfileMutation,
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
  const [getProfile] = useUsergetProfileMutation()
  const [loading, setLoading] = useState(true)

  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }
  const fetchUserProfile = async (e) => {
    const responseFromApiCall = await getProfile({
      email: userInfo.email,
      userId: userInfo,
    })
    if (responseFromApiCall) {
      const { firstName, LastName, email, mobile, profileImageName } =
        responseFromApiCall.data.user
      setUserData({
        firstName,
        LastName,
        email,
        mobile,
        profileImageName,
      })
      setFirstName(responseFromApiCall.data.user.firstName)
      setLastName(responseFromApiCall.data.user.LastName)
      setMobile(responseFromApiCall.data.user.mobile)
      setVisible(false)
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
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await updateProfile({
        email: userInfo.email,
        firstName,
        LastName,
        mobile,
        profileImage,
      })

      if (response && response.data) {
        fetchUserProfile()

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
      {/* <NavBar /> */}
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
                    borderRadius: '50%',
                    marginTop: '-100px',
                    height: '200px',
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
                      to={'/Following'}
                      className="genric-btn info w-50 mx-auto "
                    >
                      <Button
                        icon="pi pi-bookmark"
                        rounded
                        severity="primary"
                        aria-label="Bookmark"
                        label="Following"
                        style={{ height: '40px', width: '150px' }}
                      />
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
                      {`${userData.firstName} ${userData.LastName} `}
                      <Button
                        icon="pi pi-user-edit"
                        style={{ height: '1px', marginLeft: '20rem' }}
                        onClick={() => setVisible(true)}
                      />
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
    </>
  )
}

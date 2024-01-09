import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar/Navbar'
import GuideLoading from '../../components/guideComponents/guideLoading'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useGuideRegisterMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

const GuideRegister = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [LastName, setLastName] = useState('')
  const [mobile, setMobile] = useState('')
  const [Location, setLocaton] = useState('')
  const [idCardNumber, setIdCardNumber] = useState('')
  const [idCardFile, setIdCardFile] = useState(null) 
  const [profileImage, setprofileImage] = useState(null) 
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { guideInfo } = useSelector((state) => state.auth)
  const [guideLogin, { isLoading }] = useGuideRegisterMutation()
  const [waitLoading, setIsLoading] = useState(false)
  useEffect(() => {
    if (guideInfo) {
      navigate('/home')
    }
  }, [navigate, guideInfo])
  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];

  //   setIdCardFile(file);
  // };

  const handleImage1 = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }

  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setIdCardFile(reader.result)
    }
  }

  const handleImage2 = (e) => {
    const file = e.target.files[0]
    setFileToBase2(file)
  }

  const setFileToBase2 = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setprofileImage(reader.result)
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    if (
      !firstName ||
      !LastName ||
      !email ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      toast.error('Please fill in all required fields.')
      return
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // Example: Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number

    if (!password.match(passwordRegex)) {
      toast.error(
        'Password should contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.',
      )
      return
    }

    if (!idCardFile || !profileImage) {
      toast.error('Please upload ID card and profile photo.')
      return
    }
    if (password !== confirmPassword) {
      toast.error(' password do not match', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      })
    } else {
      try {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('firstname', firstName)
        formData.append('Lastname', LastName)
        formData.append('mobile', mobile)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('Location', Location)
        formData.append('idCardNumber', idCardNumber)
        formData.append('idimage', idCardFile)
        formData.append('profileimage', profileImage)

        // const responseFromApiCall = await guideLogin(formData).unwrap()
        const responseFromApiCall = await guideLogin({
          firstName,
          LastName,
          mobile,
          email,
          password,
          Location,
          idCardNumber,
          idCardFile,
          profileImage,
        }).unwrap()
        // const res = await guideLogin({
        //   firstName,
        //   LastName,
        //   mobile,
        //   email,
        //   password,
        //   Location,
        //   idCardNumber,
        //   idCardFile,
        // }).unwrap();
        console.log('response ', responseFromApiCall)
        setIsLoading(false)
        // dispatch(setCredentials({ ...responseFromApiCall}));
        toast.success('Registration Suceess Please wait for Admin Approvel')
        navigate('/guideLogin')
      } catch (err) {
        if (err.data && err.data.message) {
          toast.error(err.data.message)
        } else {
          toast.error('An error occurred. Please try again.') // Generic error message
        }
      }
    }
  }

  return (

    <div
      style={{
        backgroundImage: `url('https://wallpapercave.com/wp/wp9022469.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Set minimum height to cover the entire screen
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
  
     
      {/* Left Side (Form and Logo) */}
      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: '450px', margin: 'auto' }}>
          {/* Your logo */}
          <br />
          <br />

          <MDBCard
            alignment="center"
            className="mb-5"
            style={{ padding: '30px 0px ', marginTop:"40px" }}
          >
            <MDBIcon fas icon="user-circle" className="fa-3x" />
            <h3>Guide Sign Up</h3>
            <MDBCardBody>
              <MDBValidation noValidate className="row g-3">
                <div className="col-md-6">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your first name."
                    invalid
                  >
                    <MDBInput
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      validation="Please provide your first name"
                      invalid
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-6">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your Last name."
                    invalid
                  >
                    <MDBInput
                      label="Last Name"
                      type="text"
                      name="LastName"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      validation="Please provide your Last name"
                      invalid
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-6">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your email."
                    invalid
                  >
                    <MDBInput
                      label="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      validation="Please provide your email"
                      invalid
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-6">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your mobile number."
                    invalid
                  >
                    <MDBInput
                      label="Mobile"
                      type="tel"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      validation="Please provide your mobile number"
                      invalid
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-12">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your Location"
                    invalid
                  >
                    <MDBInput
                      label="Location"
                      type="string"
                      name="Location"
                      value={Location}
                      onChange={(e) => setLocaton(e.target.value)}
                      required
                      validation="Please provide your mobile number"
                      invalid
                    />
                  </MDBValidationItem>
                </div>

                <div className="col-md-12">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide a password."
                    invalid
                  >
                    <MDBInput
                      label="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-12">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please confirm your password."
                    invalid
                  >
                    <MDBInput
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </MDBValidationItem>
                </div>
                {/* New fields for ID card */}
                <div className="col-md-12">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your ID card number."
                    invalid
                  >
                    <MDBInput
                      label="ID Card Number"
                      type="text"
                      name="idCardNumber"
                      value={idCardNumber}
                      onChange={(e) => setIdCardNumber(e.target.value)}
                      required
                      validation="Please provide your ID card number"
                      invalid
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-12">
                  <MDBValidationItem className="col-md-4">
                    <label for="idCardFile">Upload ID Card </label>
                    <input
                      type="file"
                      id="idimage"
                      accept=".jpg, .jpeg, .png, .pdf,.avif"
                      onChange={handleImage1}
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-md-6">
                  <MDBValidationItem className="col-md-12">
                    <label for="idCardFile">Upload Profile photo </label>
                    <input
                      type="file"
                      id="profileimage"
                      accept=".jpg, .jpeg, .png, .pdf,.avif"
                      onChange={handleImage2}
                    />
                  </MDBValidationItem>
                </div>
                {/* ... (Other input fields) */}
                <div className="col-12">
                  <MDBBtn
                    style={{
                      width: '100%',
                      borderRadius: '50px',
                      backgroundColor: '#387F8E',
                      color: 'white',
                    }}
                    className="mt-2"
                    onClick={HandleSubmit}
                    disabled={waitLoading}
                  >
                    {waitLoading ? '..Loading ' : 'Register'}
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: 'center' }}></p>
            <MDBCardFooter className="mb-2">
              <Link to="/guideLogin">
                <p style={{ color: 'black' }}>
                  Already registered?
                  <span style={{ color: '#387F8E' }}> Sign in </span>
                </p>
              </Link>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>

      {/* <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src="/signup.jpeg"
          alt="New Image"
          style={{ width: "550px", height: "550px", margin: "40px" }}
        />
      </div> */}
    </div>
  )
}

export default GuideRegister

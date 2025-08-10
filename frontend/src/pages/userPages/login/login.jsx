import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from 'mdb-react-ui-kit'
import { useGoogleRegisterMutation } from '../../../redux/slices/userApiSlice'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useLoginMutation } from '../../../redux/slices/userApiSlice'
import { setCredentials } from '../../../redux/slices/userAuthSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 const [googelLogin] = useGoogleRegisterMutation()
  const [login, { isLoading }] = useLoginMutation()
  const { userInfo } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [imageIndex, setImageIndex] = useState(0)
  const images = ['/login.avif']
  useEffect(() => {
    const interval = setInterval(() => {}, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])
  //  useEffect(() => {
  //    if (userInfo) {
  //      navigate("/");
  //    }
  //  }, [navigate, userInfo]);

   const googelAuth = async (data) => {
     try {
       console.log(data)
       const {
         email,
         family_name: lastName,
         given_name: firstName,
         sub: googleId,
         picture: profileImageURL,
       } = data

       const userData = {
         firstName,
         lastName,
         email,
         googleId,
         profileImageName: profileImageURL,
         // Add other properties like mobile if needed
       }

       const res = await googelLogin(userData).unwrap()
       console.log(res)
       dispatch(setCredentials({ ...res }))
       navigate('/')
     } catch (err) {}
   }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast('Both email and password are required.')
    } else {
      try {
        const responseFromApiCall = await login({ email, password }).unwrap()
        console.log(responseFromApiCall)
        if (responseFromApiCall) {
          dispatch(setCredentials({ ...responseFromApiCall }))
          toast.success('Login Sucessfull')
          navigate('/')
        } else {
          toast.error('no details found')
        }
      } catch (err) {
        if (err.data && err.data.message) {
          toast.error(err.data.message)
        } else {
          toast.error('An error occurred. Please try again.')
        }
      }
    }
  }

  return (
    <div className="character" style={{ backgroundColor: '#fffff' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div style={{ flex: 1, maxWidth: '750px', margin: '0 1px' }}>
          {/* <h2 style={{ color: "#387F8E", marginBottom: "20px" }}>
            {randomQuote}
          </h2> */}
          <img src={images[imageIndex]} alt="" />
        </div>
        <div style={{ flex: 1, maxWidth: '450px', margin: '0 15px' }}>
          <div style={{ paddingLeft: '120px' }}>
            <img
              src="/wayfarerlogo.png" // Use the imported variable
              alt="Logo"
              style={{ width: '180px', height: '180px' }} // Adjust the width and height as needed
            />
          </div>

          <MDBCard alignment="center" className="mb-5">
            <MDBIcon fas icon="user-circle" className="fa-3x " />
            <h4>Sign In </h4>
            <MDBCardBody>
              <MDBValidation
                onSubmit={submitHandler}
                noValidate
                className="row g-3"
              >
                <div className="col-md-12">
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
                <div className="col-12">
                  <MDBBtn
                    style={{
                      width: '100%',
                      borderRadius: '50px',
                      backgroundColor: '#387F8E',
                      color: 'white',
                    }}
                    className="mt-2"
                  >
                    Login
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: 'center' }}></p>
            <MDBCardFooter className="mb-2">
              <Link to="/register">
                <p style={{ color: 'black' }}>
                  Don't have an account?
                  <span style={{ color: '#387F8E' }}> Sign Up </span>
                </p>
              </Link>
              <Link to="/guideregister">
                <p style={{ color: 'black' }}>
                  Are you a guide?
                  <span style={{ color: '#387F8E' }}> Sign Up </span>
                </p>
              </Link>
              <Link to="/forgotPassword">
                <p style={{ color: 'black' }}>
                  <span style={{ color: '#387F8E' }}> Forgot passsword? </span>
                </p>
              </Link>
              <hr />

              <div style={{ paddingLeft: '100px' }}>
                <GoogleOAuthProvider clientId="567248772521-2abchm47hgkto581ctci87o3tq2n7s5j.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential)
                      googelAuth(decoded)

                      console.log(decoded)
                    }}
                    onError={() => {
                      console.log('Login Failed')
                    }}
                  />
                </GoogleOAuthProvider>
               
              </div>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
    </div>
  )
}

export default Login

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

import 'mdb-react-ui-kit/dist/css/mdb.min.css'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useGuideLoginMutation } from '../../redux/slices/guideSlice/guideApiSlice'
import { setCredentials } from '../../redux/slices/guideSlice/guideAuthSlice'

const GuideLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [guideLogin] = useGuideLoginMutation()
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
 

  useEffect(() => {
    if (guideInfo) {
      navigate('/guideHome')
    }
  }, [navigate, guideInfo])

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Both email and password are required.')
    } else {
      try {
        const responseFromApiCall = await guideLogin({
          email,
          password,
        }).unwrap()
       
        if (responseFromApiCall) {
          if (responseFromApiCall) {
            dispatch(setCredentials({ ...responseFromApiCall }))
            toast.success('sucess')
            navigate('/guideHome')
          }
        }
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
        backgroundImage: `url('https://images.unsplash.com/photo-1603623898182-2cd32c343d70?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Set minimum height to cover the entire screen
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <div style={{ flex: 1, maxWidth: '450px', margin: '0 15px' }}>
          <MDBCard alignment="center" className="mb-5">
            <MDBIcon fas icon="user-circle" className="fa-3x" />
            <div>
              <img
                src="/logos2.png" // Use the imported variable
                alt="Logo"
                style={{ height: '60px' }} // Adjust the width and height as needed
              />
            </div>
            <h5 style={{paddingTop:"20px"}}> Guide Sign In </h5>
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
              <Link to="/guideRegister">
                <p style={{ color: 'black' }}>
                  Don&apos;t have an account?
                  <span style={{ color: '#387F8E' }}> Sign Up </span>
                </p>
              </Link>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
    </div>
  )
}

export default GuideLogin

import React from 'react'
import { useState, useEffect } from 'react'
// import NavBar from '../../../components/userComponents/navBar/NavBar'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useForgotPasswordMutation } from '../../../redux/slices/userApiSlice'
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

import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../../components/Navbar/Navbar'
const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [verifyEmail] = useForgotPasswordMutation()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!email) {
        toast.error(' email is required')
      } else {
        setLoading(true)
        sessionStorage.setItem('forgotPasswordEmail', email)
        // localStorage.setItem("forgotPasswordEmail", email);
        const responseFromApiCall = await verifyEmail({ email }).unwrap()
        console.log(responseFromApiCall)
        if (responseFromApiCall.success) {
          navigate('/verifyOtp')
        }
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="character" style={{ backgroundColor: '#fffff' }}>
    <Navbar></Navbar>
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
            <MDBIcon fas icon="user-circle" className="fa-3x " />
            <h5>Enter Your Registered Email</h5>

            <MDBCardBody>
              <MDBValidation
                noValidate
                onSubmit={submitHandler}
                className="row g-3"
              >
                <div className="col-md-12">
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please Enter Registered Email"
                    invalid
                  >
                    <MDBInput
                      label="Enter Your Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      validation="Enter the Email"
                      invalid
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-12">
                  <MDBBtn
                    disabled={loading}
                    style={{
                      width: '100%',
                      borderRadius: '50px',
                      backgroundColor: '#387F8E',
                      color: 'white',
                    }}
                    className="mt-2"
                  >
                    {loading ? 'Verifying...' : 'Verify email'}
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: 'center' }}></p>
            <MDBCardFooter className="mb-2">
              <Link to="/Login">
                <p style={{ color: 'black' }}>
                  Remember Now
                  <span style={{ color: '#387F8E' }}> Sign in </span>
                </p>
              </Link>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

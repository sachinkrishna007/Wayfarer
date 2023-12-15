import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAdminloginMutation } from '../../redux/slices/adminSlice/adminApiSlice'
import { setCredentials } from '../../redux/slices/adminSlice/adminAuthSlice'
import { useDispatch, useSelector } from 'react-redux'

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
import { toast } from 'react-toastify'

const loginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [Adminlogin, { isLoading }] = useAdminloginMutation()
  const { adminInfo } = useSelector((state) => state.adminAuth)
  console.log(adminInfo)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const responseFromApiCall = await Adminlogin({
        email,
        password,
      }).unwrap()

      dispatch(setCredentials({ ...responseFromApiCall }))
      navigate('/adminHome')
    } catch (err) {
      toast.error('please check your email and password')
    }
  }

  return (
    <div style={{ backgroundColor: '#fffff' }}>
      <div
        style={{
          backgroundImage: 'url("./https://img.freepik.com/free-photo/background_53876-32169.jpg")', // Replace with the URL of your background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div></div>
        <div>
          <div>
            <img
              src="/adminLogo.png" // Use the imported variable
              alt="Logo"
              style={{
                width: 'auto',
                height: '150px',
                margin: '0 auto',
                display: 'block',
              }} // Adjust the width and height as needed
            />
          </div>
          <h3
            style={{
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
              display: 'block',
              fontFamily: 'Poppins',
              paddingLeft: '20px',
            }}
          >
            Welcome Back Admin
          </h3>

          <MDBCard
            style={{ paddingLeft: '270px' }}
            alignment=""
            className="mb-1 character"
          >
            <MDBIcon fas icon="user-circle" className="fa-3x" />

            <MDBCardBody>
              <MDBValidation
                onSubmit={submitHandler}
                noValidate
                className="row g-3"
              >
                <div className="col-md-10">
                  <MDBValidationItem
                    className="col-md-8"
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
                <div className="col-md-8">
                  <MDBValidationItem
                    className="col-md-10 "
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
                      width: '50%',
                      borderRadius: '50px',
                      backgroundColor: 'black',
                      color: 'white',
                    }}
                    className="mt-5"
                  >
                    Login
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: 'center' }}></p>
           
          </MDBCard>
        </div>
      </div>
      
    </div>
  )
}

export default loginScreen

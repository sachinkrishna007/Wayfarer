import React from 'react'
import { useState, useEffect } from 'react'
// import NavBar from '../../../components/userComponents/navBar/NavBar'
import { useChangePasswordMutation } from '../../../redux/slices/userApiSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

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
import { Link, useNavigate } from 'react-router-dom'
const UserChangePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const email = sessionStorage.getItem('forgotPasswordEmail')
  const [ChangePassword, { isLoading }] = useChangePasswordMutation()
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      if (password !== confirmPassword) {
        toast.error(' password do not match')
      } else {
        const responseFromApiCall = await ChangePassword({
          email,
          password,
        }).unwrap()
        if (responseFromApiCall) {
          //   localStorage.removeItem("forgotPasswordEmail");
          sessionStorage.removeItem('forgotPasswordEmail')
          toast.success('password changed sucessfully')
          navigate('/Login')
        }
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
    <div className="character" style={{ backgroundColor: '#fffff' }}>
      {/* <NavBar></NavBar> */}
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

            <MDBCardBody>
              <MDBValidation
                onSubmit={submitHandler}
                noValidate
                className="row g-3"
              >
                <h5>Enter New Password</h5>
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
                    feedback="Please provide a password."
                    invalid
                  >
                    <MDBInput
                      label=" Confirm Password"
                      type="password"
                      name="confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </MDBValidationItem>
                </div>
                <div className="col-12">
                  <MDBBtn
                    style={{
                      width: '100%',
                      borderRadius: '50px',
                      backgroundColor: 'Black',
                      color: 'white',
                    }}
                    className="mt-2"
                  >
                    Change Password
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: 'center' }}></p>
            <MDBCardFooter className="mb-2"></MDBCardFooter>
          </MDBCard>
        </div>
      </div>
    </div>
  )
}

export default UserChangePassword

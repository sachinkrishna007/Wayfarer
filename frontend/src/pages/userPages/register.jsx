import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/userComponents/loading";


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
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/slices/userAuthSlice";
import {
  useRegisterMutation,
  useGoogleRegisterMutation,
} from "../../redux/slices/userApiSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useRegisterMutation();
  const [googelLogin] = useGoogleRegisterMutation();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(" password do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        const res = await login({
          firstName,
          LastName,
          mobile,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {}
    }
  };
  const googelAuth = async (data) => {
    try {
      console.log(data);
      const {
        email,
        family_name: lastName,
        given_name: firstName,
        sub: googleId,
        picture: profileImageURL,
      } = data;

      const userData = {
        firstName,
        lastName,
        email,
        googleId,
        profileImageName: profileImageURL,
        // Add other properties like mobile if needed
      };

      const res = await googelLogin(userData).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      
    }
  };
  return (
    <div style={{ display: "flex" }}>
     
      {/* Left Side (Form and Logo) */}
      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: "450px", margin: "auto" }}>
          {/* Your logo */}
          <div style={{ paddingLeft: "120px" }}>
            <img
              src="/wayfarerlogo.png"
              alt="Logo"
              style={{ width: "200px", height: "200px" }}
            />
          </div>

          <MDBCard alignment="center" className="mb-5">
            <MDBIcon fas icon="user-circle" className="fa-3x" />
            <h5>Sign Up</h5>
            <MDBCardBody>
              <MDBValidation
                onSubmit={submitHandler}
                noValidate
                className="row g-3"
              >
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
                    feedback="Please provide your last name."
                    invalid
                  >
                    <MDBInput
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      validation="Please provide your last name"
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
                <div className="col-12">
                  <MDBBtn
                    style={{
                      width: "100%",
                      borderRadius: "50px",
                      backgroundColor: "#387F8E",
                      color: "white",
                    }}
                    className="mt-2"
                  >
                    Sign Up
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: "center" }}></p>
            <MDBCardFooter className="mb-2">
              <Link to="/">
                <p style={{ color: "black" }}>
                  Already registered?
                  <span style={{ color: "#387F8E" }}> Sign in </span>
                </p>
              </Link>
              <div style={{ paddingLeft: "100px" }}>
                <GoogleOAuthProvider clientId="567248772521-2abchm47hgkto581ctci87o3tq2n7s5j.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      const decoded = jwtDecode(credentialResponse.credential);
                      googelAuth(decoded);

                      //   console.log(decoded);
                    }}
                    onError={() => {
                      toast.error("failed to verify");
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
      {isLoading && <Loader></Loader>}
      <div style={{ flex: 1, textAlign: "center" }}>
        <img
          src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="New Image"
          style={{ width: "550px", height: "550px", margin: "40px" }}
        />
      </div>
    </div>
  );
};

export default Register;

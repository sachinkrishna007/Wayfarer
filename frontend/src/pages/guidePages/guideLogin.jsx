
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,

  MDBIcon,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGuideLoginMutation } from "../../redux/slices/guideSlice/guideApiSlice";
import { setCredentials } from "../../redux/slices/guideSlice/guideAuthSlice";

const GuideLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [guideLogin, ] = useGuideLoginMutation();
  const { guideInfo } = useSelector((state) => state.guideAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageIndex] = useState(0);
  const images = ["/login.avif"];
  useEffect(() => {
    const interval = setInterval(() => {}, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

   useEffect(() => {
     if (guideInfo) {
       navigate("/guideHome");
     }
   }, [navigate, guideInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both email and password are required.");
    } else {
      try {
        const responseFromApiCall = await guideLogin({
          email,
          password,
        }).unwrap();
        console.log(responseFromApiCall);
        if (responseFromApiCall) {
          

          if (responseFromApiCall.data.isAuthorized) {
            dispatch(setCredentials({ ...responseFromApiCall }));
            toast.success("sucess");
            navigate("/guideHome");
          }else{
             toast.warning("Approval pending please Wait....");
          }
        } else {
          toast.error("Invalid credentials"); // Handle invalid credentials
        }
      } catch (error) {
        if (error.status === 401) {
          toast.warning("Approval pending."); // Handle unauthorized access
        } else if(error.status==400){
          toast.error('check email/password'); // Handle other errors
        }
      }
    }
  };

  return (
    <div style={{ backgroundColor: "#fffff" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div style={{ flex: 1, maxWidth: "750px", margin: "0 1px" }}>
          {/* <h2 style={{ color: "#387F8E", marginBottom: "20px" }}>
            {randomQuote}
          </h2> */}
          <img src={images[imageIndex]} alt="" />
        </div>
        <div style={{ flex: 1, maxWidth: "450px", margin: "0 15px" }}>
          <div style={{ paddingLeft: "120px" }}>
            <img
              src="/wayfarerlogo.png" // Use the imported variable
              alt="Logo"
              style={{ width: "180px", height: "180px" }} // Adjust the width and height as needed
            />
          </div>

          <MDBCard alignment="center" className="mb-5">
            <MDBIcon fas icon="user-circle" className="fa-3x" />
            <h5> Guide Sign In </h5>
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
                      width: "100%",
                      borderRadius: "50px",
                      backgroundColor: "#387F8E",
                      color: "white",
                    }}
                    className="mt-2"
                  >
                    Login
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
            <p style={{ textAlign: "center" }}></p>
            <MDBCardFooter className="mb-2">
              <Link to="/guideRegister">
                <p style={{ color: "black" }}>
                  Don&apos;t have an account?
                  <span style={{ color: "#387F8E" }}> Sign Up </span>
                </p>
              </Link>
            </MDBCardFooter>
          </MDBCard>
        </div>
      </div>
    </div>
  );
};

export default GuideLogin;

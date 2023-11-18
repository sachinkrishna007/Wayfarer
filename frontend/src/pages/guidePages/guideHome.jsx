import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/guideComponents/navbar/GuideNavbar";
import { useSelector } from "react-redux";
import { useGuideGetDataMutation } from "../../redux/slices/guideSlice/guideApiSlice";
import "./guideHome.css";
import Loader from "../../components/userComponents/loading";
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
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
export default function GuideHome() {
  const [guideData, setGuideData] = useState([]);
  const { guideInfo } = useSelector((state) => state.guideAuth);
  const [guideDataFromAPI] = useGuideGetDataMutation();
  
  const [loading, setLoading] = useState(true);
  useEffect(
    () => {
      try {
        const fetchData = async () => {
          const responseFromApiCall = await guideDataFromAPI({
            guideId: guideInfo.data.email,
          });

          const guideArray = responseFromApiCall.data.guideData;
          

          setGuideData(guideArray[0]);
           setLoading(false);
        };

        fetchData();
      } catch (error) {
        toast.error(error);

        console.error("Error fetching users:", error);
      }
    },
    [],
    guideData
  );
  if (loading) {
    return <Loader></Loader>;
  }
  const languages = guideData.Language > 0 ? guideData[0].Language : [];
  return (
    <>
      <NavBar />

      <MDBContainer className="py-5  container">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={guideData.profileImage}
                  alt="avatar"
                  className="square"
                  style={{ width: "500px" }}
                  fluid
                />
                {/* <p className="text-muted mb-1">{guideInfo.data.firstName}</p>
                 */}
                {/* <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div> */}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="github fa-lg"
                      style={{ color: "#333333" }}
                    />
                    <Link
                      to={"/guideAddData"}
                      className="genric-btn info w-50 mx-auto "
                    >
                      <MDBBtn style={{ backgroundColor: "#387F8E" }}>
                        ADD/Edit DETAILS
                      </MDBBtn>
                    </Link>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3 ">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />

                    <Link className="genric-btn info w-50 mx-auto ">
                      <MDBBtn style={{ backgroundColor: "#387F8E" }}>
                        ChangePassword
                      </MDBBtn>
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
                      {`${guideInfo.data.firstName} ${guideInfo.data.lastName} `}
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
                      {guideInfo.data.email}
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
                      {guideInfo.data.mobile}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Preferred Location</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {guideInfo.data.Location}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />

                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {guideData.Description
                        ? guideData.Description
                        : "Please add t activate your account"}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow className="mt-4">
              {/* Languages */}
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1"></span>
                      <h6>Added Languages</h6>
                    </MDBCardText>
                    {guideData.Language  ? (
                      <>
                        <li>{guideData.Language[0]}</li>
                        <li>{guideData.Language[1]}</li>
                        <li>{guideData.Language[2]}</li>
                      </>
                    ) : (
                      <li>Update your profile</li>
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              {/* Activities */}

              {/* Current Price per Day */}
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1"></span>{" "}
                      <h6>Your Charge Per Day</h6>
                    </MDBCardText>
                    <MDBCardText
                      style={{ fontSize: "2rem", paddingLeft: "20px" }}
                    >
                      <h6>
                        ₹
                        {guideData.price
                          ? guideData.price
                          : "Update your profile"}
                      </h6>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <MDBCardText className="lead fw-normal mb-0">
          Recent Travel Pictures & Experience
        </MDBCardText>
        <MDBCardText className="mb-0">
          <a href="#!" className="text-muted">
            Show all
          </a>
        </MDBCardText>
      </div>

      <MDBRow>
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
      </MDBRow>
    </>
  );
}

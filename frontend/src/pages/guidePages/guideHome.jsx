import  { useEffect,useState } from "react";
import NavBar from "../../components/guideComponents/navbar/GuideNavbar";
import { useSelector, } from "react-redux";
import { useGuideGetDataMutation } from "../../redux/slices/guideSlice/guideApiSlice";
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

import { toast } from "react-toastify"
export default function GuideHome() {
  const [guideData, setGuideData] = useState([]);
  const { guideInfo } = useSelector((state) => state.guideAuth);
  const [guideDataFromAPI, ] = useGuideGetDataMutation();


  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await guideDataFromAPI({
          guideId: guideInfo.data.email,
        });

        const guideArray = responseFromApiCall.data.guideData;
        console.log("llll", guideArray);

        setGuideData(guideArray[0]);
        
      };
      
      fetchData();
     
    } catch (error) {
      toast.error(error);
      
      console.error("Error fetching users:", error);
    }
  },[],guideData);
 const languages = guideData.Language > 0 ? guideData[0].Language : [];

  return (
    <>
      <NavBar />

      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="./guide.avif"
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
                    <MDBBtn
                      style={{ backgroundColor: "#387F8E" }}
                      color="primary"
                      size="md"
                      className="genric-btn info w-50 mx-auto "
                    >
                      Edit Profile
                    </MDBBtn>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3 ">
                    <MDBIcon
                      fab
                      icon="twitter fa-lg"
                      style={{ color: "#55acee" }}
                    />
                    <MDBBtn
                      style={{ backgroundColor: "#387F8E" }}
                      color="primary"
                      size="md"
                      className="btn info w-50 mx-auto "
                    >
                      Forgot Password
                    </MDBBtn>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                    <MDBIcon
                      fab
                      icon="instagram fa-lg"
                      style={{ color: "#ac2bac" }}
                    />
                    <MDBBtn
                      color="primary"
                      style={{ backgroundColor: "#387F8E" }}
                      size="md"
                      className="genric-btn info w-50 mx-auto "
                    >
                      Edit Details
                    </MDBBtn>
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
                      {guideInfo.data.address
                        ? guideInfo.data.address
                        : "not provided"}
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
                      <MDBBtn
                        color="primary"
                        style={{ backgroundColor: "#387F8E" }}
                        size="sm"
                        className="mx-2"
                      >
                        Added Languages
                      </MDBBtn>
                    </MDBCardText>
                    {guideData.Language}
                    
                   
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
                      <MDBBtn
                        color="primary"
                        style={{ backgroundColor: "#387F8E" }}
                        size="sm"
                        className="mx-2"
                      >
                        Guide Charge per Day
                      </MDBBtn>
                    </MDBCardText>
                    <MDBCardText
                      style={{ fontSize: "2rem", paddingLeft: "20px" }}
                    >
                      ${guideData ? guideData.price : "Update your profile"}
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

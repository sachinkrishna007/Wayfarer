import NavBar from "../../../components/userComponents/navBar/navBar";
import "./guideDetailed.css";
import Footer from "../../../components/userComponents/footer/footer";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../../components/userComponents/loading";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useGetSingleGuideMutation } from "../../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
export default function EditButton() {
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [endDate, setEndDate] = useState("");
  const id = location.pathname.split("/")[2];
  const [guideSingleDataFromAPI] = useGetSingleGuideMutation();
  const [guideData, setGuideData] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseFromApiCall = await guideSingleDataFromAPI({
          guideId: id,
        });

        const guide = await responseFromApiCall.data.guideData;
        console.log("llll", guide);
        setGuideData(guide);
        setLoading(false);
      };

      fetchData();
    } catch (error) {
      toast.error(error);

      console.error("Error fetching users:", error);
    }
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }
  const checkAvailability = () => {
    if (!startDate || !endDate) {
      toast.warning('Please add dates')
      return;
    }
    const bookingData = {
      startDate,
      endDate,
      guideName: `${guideData.firstname} ${guideData.Lastname}`,
      guideId: guideData._id,
      userId: userInfo._id,
      userEmail: userInfo.email,
      guidePrice: guideData.price,
      guideLocation: guideData.Location,
      guideProfile:guideData.profileImage
      
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

       navigate('/bookingPage')
    // Optionally, you can navigate to the next page here
    // Example: history.push('/next-page');
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className="gradient-custom-2">
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="12" xl="12">
              <MDBCard>
                <div
                  className="rounded-top text-dark d-flex flex-row"
                 
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <MDBCardImage
                      src={guideData.profileImage}
                      alt="Generic placeholder image"
                      className="mt-6 mb-2 img-thumbnail guideimage"
                      fluid
                    />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <MDBTypography tag="h2" className="guideName">
                      {" "}
                      {guideData.firstname} {guideData.Lastname}
                    </MDBTypography>
                    <MDBCardText className="guideLoc" tag="h6">
                      {guideData.Location}
                    </MDBCardText>
                  </div>
                </div>
                <div
                  className="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex justify-content-end text-center py-1">
                    <div></div>
                    <div className="px-3"></div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4 guideAbout">
                  <div className="mb-5">
                    <h1 className="lead fw-normal mb-1">About</h1>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="mb-2">
                        <strong>Email:</strong> {guideData.email}
                      </div>
                      <div className="mb-2 ">
                        <strong>Phone:</strong>
                        {guideData.mobile}
                      </div>
                      <div className="mb-2">
                        <strong>Guide charge/day:</strong> {guideData.price}
                      </div>
                      <div className="mb-2">
                        <strong>Languages:</strong> {guideData.Language[0]}{" "}
                        {guideData.Language[1]}, {guideData.Language[2]}
                      </div>
                      {/* Add any other details you want to display */}

                      <div className="mb-2">
                        <strong>Select Start Date :</strong>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <strong>Select End Date :</strong>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="dd/MM/yyyy"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <button
                          className="btn btn-primary"
                          onClick={checkAvailability}
                        >
                          BooK
                        </button>
                        <span className="ml-2">{availabilityStatus}</span>
                      </div>
                    </div>
                  </div>

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
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Footer></Footer>
    </div>
  );
}

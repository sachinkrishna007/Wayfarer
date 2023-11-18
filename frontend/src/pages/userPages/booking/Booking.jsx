import React, { useEffect, useState } from "react";
import Heading from "../../../components/userComponents/Headings/heading";
import NavBar from "../../../components/userComponents/navBar/navBar";
import { useGetBookingMutation } from "../../../redux/slices/userApiSlice";
import PayButton from "../../../components/PayButton";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from "mdb-react-ui-kit";
import moment from "moment";
import { Button } from "react-bootstrap";
import Loader from "../../../components/userComponents/loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Booking = () => {
  const [bookingDetails, setBookingDetails] = useState({
    startDate: "",
    endDate: "",
    guideName: "",
    guideId: "",
    userId: "",
    price: "",
    location: "",
  });
  const [createBooking, { isLoading }] = useGetBookingMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve booking details from local storage
    const storedBookingDetails =
      JSON.parse(localStorage.getItem("bookingData")) || {};
    setBookingDetails(storedBookingDetails);
  }, []);

  const calculateTotalPrice = () => {
    const startMoment = moment(bookingDetails.startDate);

    const endMoment = moment(bookingDetails.endDate);
    const duration = moment.duration(endMoment.diff(startMoment));
    const days = duration.asDays() + 1;
    const totalPrice = days * bookingDetails.guidePrice;
    return { days, totalPrice };
  };

  const { days, totalPrice } = calculateTotalPrice();

  const handleSubmit = async () => {
    console.log("here");

    try {
      const responseFromApiCall = await createBooking({
        userid: userInfo._id,
        guideid: bookingDetails.guideId,
        Location: bookingDetails.guideLocation,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        userEmail: bookingDetails.userEmail,
        guideName: bookingDetails.guideName,
        Days: days,
        totalAmount: totalPrice,
      });

      if (responseFromApiCall) {
        toast.success("booking Successfully.");
        localStorage.removeItem("bookingData");
        navigate("/Confirmation");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <Heading
        cName="hero"
        name="htext123"
        imageclass="cover123"
        img="https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"
        title="Confirm Booking"
        text="Happy to have you on board"
      />

      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={bookingDetails.guideProfile}
                  alt="avatar"
                  style={{ width: "autopx", height: "200px" }}
                  fluid
                />
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
                      {bookingDetails.guideName}
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
                      {bookingDetails.userEmail}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>

                {/* <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      (097) 234-5678
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
                      (098) 765-4321
                    </MDBCardText>
                  </MDBCol>
                </MDBRow> */}
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Location</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {bookingDetails.guideLocation}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Start Date</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {moment(bookingDetails.startDate).format("LL")}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>End Date</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {moment(bookingDetails.endDate).format("LL")}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Number of Days</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{days}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Total Price</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {totalPrice}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <PayButton
              userid={userInfo._id}
              guideid={bookingDetails.guideId}
              Location={bookingDetails.guideLocation}
              startDate={bookingDetails.startDate}
              endDate={bookingDetails.endDate}
              userEmail={bookingDetails.userEmail}
              guideName={bookingDetails.guideName}
              Days={days}
              totalAmount={totalPrice}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Booking;

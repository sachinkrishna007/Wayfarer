import { useStripeBookingMutation } from "../redux/slices/userApiSlice";
import { useGetBookingMutation } from "../redux/slices/userApiSlice";
import React from "react";
const url = "/api/stripe/create-checkout-session";
const PayButton = ({
  userid,
  guideid,
  Location,
  startDate,
  endDate,
  userEmail,
  guideName,
  Days,
  totalAmount,
  guideImage
}) => {
  const [Stripe, { isLoading }] = useStripeBookingMutation();
   const [createBooking] = useGetBookingMutation();
  const handleCheckout = async () => {
    try {
     
      const responseFromApiCall = await Stripe({
        userid,
        guideid,
        Location,
        startDate,
        endDate,
        userEmail,
        guideName,
        Days,
        totalAmount,
        
      });
      console.log(responseFromApiCall);
       const response = await createBooking({
         userid,
         guideid,
         Location,
         startDate,
         endDate,
         userEmail,
         guideName,
         Days,
         totalAmount,
         guideImage
       });
       if(response){

           localStorage.removeItem("bookingData");
           window.location.href = responseFromApiCall.data.url;
       }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50" /* Green */,
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => handleCheckout()}
      >
        CheckOut
      </button>
    </div>
  );
};

export default PayButton;

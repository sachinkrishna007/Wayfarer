import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Knob } from "primereact/knob";
import { InputTextarea } from "primereact/inputtextarea";
import "./Rating.css";
import { useAddRatingMutation } from "../../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
export default function Rating({ guideId, userId }) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");
  const [rating] = useAddRatingMutation();
  const submitHandler = async () => {
    console.log("here");
    try {
      const responseFromApiCall = await rating({
        guideId,
        userId,
        comment,
        value,
      });
      if (responseFromApiCall) {
        toast.success("Rating sucessfully posted");
      }
    } catch (err) {
      if (err.data && err.data.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An error occurred. Please try again."); // Generic error message
      }
    }
  };
  return (
    <div className="card flex justify-content-center">
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        style={{ width: "500px" }}
      >
        <h6>Give Rating </h6>
        <div className=" justify-content-center">
          <Knob
            value={value}
            onChange={(e) => setValue(e.value)}
            max={10}
            step={1.0}
            strokeWidth={5}
            style={{ paddingLeft: "20px" }}
          />
        </div>
        <div className="card flex justify-content-center">
          <h6>Add a Feedback About the Guest</h6>
          <InputTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
        <Button
          label="Submit"
          type="submit"
          icon="pi pi-check"
          onClick={submitHandler}
        />
      </Sidebar>

      <Button onClick={() => setVisible(true)}>Give Rating</Button>
    </div>
  );
}

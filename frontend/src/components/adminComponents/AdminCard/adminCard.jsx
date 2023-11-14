import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import "./adminCard.css";
import {toast} from 'react-toastify'
import { PROFILE_IMAGE_DIR_PATH } from "../../../utils/constances";
import { useGuideAcceptRequestMutation } from "../../../redux/slices/adminSlice/adminApiSlice";
export default function AdminCard({ guide }) {
  console.log(guide);
  const [visible, setVisible] = useState(false);
  
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [guideId, setacceptReqGuide] = useState(null);

  const [showModal, setShowModal] = useState(false); // State for the update modal
  const [acceptGuide,{isLoading}]=useGuideAcceptRequestMutation()
  console.log(selectedGuide);

  const header = (
    <img alt="Card" src="/guide.avif" style={{ height: "16rem" }} />
  );

  const footer = <></>;

 const handleAgree = async()=>{
  try{
    console.log(guideId);
    console.log('here');
     const responseFromApiCall = await acceptGuide({ userId :guideId});
      if (responseFromApiCall) {
        toast.success("User accepted Successfully.");

        setacceptReqGuide(null); // Clear the user object
          setShowModal(false);
      }

  }catch(err){

  }
  }

 
  return (
    <div>
      <Dialog
        visible={showModal}
        style={{ width: "30%" }}
        onHide={() => setShowModal(false)}
        header="Confirm Request"
        modal
        footer={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowModal(false)}
              style={{ backgroundColor: "#FF5733", marginRight: "10px" }}
            />
            <Button
              label="Accept"
              icon="pi pi-check"
              onClick={handleAgree}
              disabled={isLoading}
              style={{ backgroundColor: "#4CAF50" }}
            />
          </div>
        }
      >
        <p>Are you sure you want to accept this Guide?</p>
      </Dialog>
      <Dialog
        visible={visible}
        style={{ width: "30%" }}
        onHide={() => setVisible(false)}
        header="ID Card"
        modal
      >
        {selectedGuide && (
          <img
            alt="ID Card"
            src={`http://localhost:5000/guideImages/${selectedGuide.idCardFile}`}
            style={{ width: "100%" }}
          />
        )}
      </Dialog>

      <div className="card-container">
        {guide.map((guide, index) => (
          <Card
            key={index}
            title={
              <span className="title">{`${guide.firstname} ${guide.Lastname}`}</span>
            }
            subTitle={<span className="subTitle">{guide.Location}</span>}
            footer={footer}
            header={header}
            className="small-card zoom-in-card"
            role="region"
          >
            <div>
              <strong className="mobilead">Mobile:</strong> {guide.mobile}
            </div>
            <Button
              label="View ID Card"
              icon="pi pi-image"
              style={{ marginLeft: "0.5rem",   }}
              onClick={(e) => {
                setSelectedGuide(guide); // Store the selected guide

                setVisible(true); // Show the dialog
              }}
            />
            <Button
              className="btnagree"
              label="Approve"
              onClick={(e) => {
                setacceptReqGuide(guide);
                setShowModal(true);
              }}
              style={{ marginLeft: "0.5rem" }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

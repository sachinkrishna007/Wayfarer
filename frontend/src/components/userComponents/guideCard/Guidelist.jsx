import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import debounce from "lodash/debounce";


import { CascadeSelect } from "primereact/cascadeselect";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useSelector } from "react-redux";
export default function GuideList({ guide }) {
  const countries = [
    {
      name: "Australia",
      code: "AU",
      states: [
        {
          name: "New South Wales",
          cities: [
            { cname: "Sydney", code: "A-SY" },
            { cname: "Newcastle", code: "A-NE" },
            { cname: "Wollongong", code: "A-WO" },
          ],
        },
      ],
    },
  ];
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  const header = (
    <img
      alt="Card"
      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      style={{ height: "17rem" }}
    />
  );

  const footer = <></>;

   const [searchQuery, setSearchQuery] = useState("");

   const delayedSearch = debounce((value) => {
     setSearchQuery(value);
   }, 400);
  const handleSearch = (event) => {
     const { value } = event.target;
     delayedSearch(value);
  };

  const filteredGuides = guide.filter(
    (guides) =>
      guides.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guides.firstname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="guideHeading">Available Guides</h1>
      </div>

      <div className="searchguide">
        <span className="p-input-icon-left">
          <i className="pi pi-spin pi-spinner" />
          <InputText
            placeholder="Search your Location"
            onChange={handleSearch}
          />
        </span>
      </div>

      {guide && guide.length > 0 ? (
        filteredGuides.length > 0 ? (
          <div className="card-container">
            {filteredGuides.map((guide, index) => (
              <Card
                key={index}
                title={
                  <span className="title">{`${guide.firstname} ${guide.Lastname}`}</span>
                }
                subTitle={
                  <span className="subtitle">
                    <FaMapMarkerAlt className="locationIcon" /> {guide.Location}
                  </span>
                }
                footer={footer}
                header={header}
                className="small-card zoom-in-card "
                role="region"
              >
                <div className="mobileop">
                  <strong>Mobile:</strong> {guide.mobile}
                </div>
                <div>
                  {userInfo && userInfo._id && (
                    <Link to={`/guideDetailedView/${guide._id}`}>
                      <Button className="guidebtn">More Details</Button>
                    </Link>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <h1>No guides in this location.</h1>
        )
      ) : (
        <h1>No guides available currently</h1>
      )}
    </div>
  );
  
}

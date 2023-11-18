import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import debounce from "lodash/debounce";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./card.css";
import { FaMapMarkerAlt } from "react-icons/fa";

import { useSelector } from "react-redux";
import { guideSlice } from "../../../redux/slices/guideSlice/guideApiSlice";
export default function GuideList({ guide }) {
  console.log(guide);
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
    const header = guide.profileImage ? (
      <img
        alt="Guide Profile"
        src={guide.profileImage}
        style={{ width: "100%" }}
      />
    ) : null;



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
        <div className="card-container">
          {filteredGuides.map((guideInfo, index) => (
            <Card key={index} className="small-card">
              <div>
                <h3 className="title">{`${guideInfo.firstname} ${guideInfo.Lastname}`}</h3>
                <img
                  src={guideInfo.profileImage}
                  alt={`Profile of ${guideInfo.firstname}`}
                  style={{ width: "100%", height: "250px" }}
                  className="guideimage"
                />
                <p className="subtitle">Email: {guideInfo.email}</p>
                <p className="mobileop">Mobile: {guideInfo.mobile}</p>
                <Link to={`/guideDetailedView/${guideInfo._id}`}>
                  <Button
                    label="View Details"
                    className="p-button-raised p-button-info"
                  />
                </Link>
                {/* Add more details or customize the display as needed */}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <h1>No guides available currently</h1>
      )}
    </div>
  );
}

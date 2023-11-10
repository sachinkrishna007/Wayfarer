import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { CascadeSelect } from "primereact/cascadeselect";
import { useState } from "react";
import "./card.css";

export default function GuideList({guide}) {
  
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
        ]
      },
    ];
 const [selectedCity, setSelectedCity] = useState(null);
  
  const header = (
    <img
      alt="Card"
      src="/guide.avif"
      style={{height:'16rem'}}
    />
  );

  const footer = (
    <>
      <Button
        label="More Details"
      
        style={{ marginLeft: "0.5rem" }}
      />
    </>
  );

  

  return (
    <div>
      <CascadeSelect
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={countries}
        optionLabel="cname"
        optionGroupLabel="name"
        optionGroupChildren={["states", "cities"]}
        className="w-full md:w-14rem"
        breakpoint="767px"
        placeholder="Select a City"
        style={{ minWidth: "14rem" }}
      />
      <CascadeSelect
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={countries}
        optionLabel="cname"
        optionGroupLabel="name"
        optionGroupChildren={["states", "cities"]}
        className="w-full md:w-14rem"
        breakpoint="767px"
        placeholder="Sort by Price"
        style={{ minWidth: "14rem" }}
      />
      <CascadeSelect
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.value)}
        options={countries}
        optionLabel="cname"
        optionGroupLabel="name"
        optionGroupChildren={["states", "cities"]}
        className="w-full md:w-14rem"
        breakpoint="767px"
        placeholder="Sort by Activity"
        style={{ minWidth: "14rem" }}
      />
      {guide && guide.length > 0 ? (
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
                <strong className="mobile">Mobile:</strong> {guide.mobile}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <h1>no guides available currently</h1>
      )}
    </div>
  );
}

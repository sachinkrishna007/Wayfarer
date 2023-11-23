import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./userTable.css";
export default function BookingTable({ booking }) {
    console.log(booking);

     const formatDate = (dateString) => {
       const date = new Date(dateString);
       return date.toLocaleDateString();
     };
  const guideImageTemplate = (rowData) => {
    return (
      <img
        src={
          rowData.guideImage
            ? rowData.guideImage
            : "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
        }
        alt="Guide"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
    );
  };

  const actionTemplate = () => {
    return <button className="p-button p-button-success">View</button>;
  };

  return (
    <div className="card">
      <DataTable
        value={booking}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No bookings found"
      >
        <Column
          header="Guide Image"
          body={guideImageTemplate}
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="guidename"
          header="Guide Name"
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="location"
          header="Location"
          style={{ width: "15%" }}
        ></Column>
        <Column
          field="startDate"
          header="Start Date"
          style={{ width: "15%" }}
          body={(rowData) => formatDate(rowData.startDate)}
        ></Column>
        <Column
          field="endDate"
          header="End Date"
          style={{ width: "15%" }}
          body={(rowData) => formatDate(rowData.endDate)}
        ></Column>
        <Column
          field="totalDays"
          header="Days"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="totalAmount"
          header="Amount"
          style={{ width: "10%" }}
        ></Column>

        <Column
          header="Action"
          body={actionTemplate}
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}

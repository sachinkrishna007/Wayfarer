import { useEffect, useState } from "react";
import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { useListGuideMutation } from "../../redux/slices/adminSlice/adminApiSlice";
import {
  useBlockGuideMutation,
  useUnBlockGuideMutation,
} from "../../redux/slices/adminSlice/adminApiSlice";
import { toast } from "react-toastify";
import "./table.css";
import AdminSidebar from "../../components/adminComponents/sidebar";
const GuideData = () => {
    
  const [guideDataFromAPI, { isLoading }] = useListGuideMutation();
  const [guideData, setGuideData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [guideData]);

  const fetchData = async () => {
    const responseFromApiCall = await guideDataFromAPI();
    console.log(responseFromApiCall);

    const guideArray = responseFromApiCall.data.guideData;

    setGuideData(guideArray);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const [userIdToBlock, setUserIdToBlock] = useState(null);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGuides = guideData.filter(
    (user) =>
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [blockGuide, { isLoading: isBlocking }] = useBlockGuideMutation();
  const [unblockGuide, { isLoading: isunBlocking }] = useUnBlockGuideMutation();

  const handleBlock = async (guideId) => {
    try {
      const responseFromApiCall = await blockGuide({ guideId });

      console.log("Block API Response:", responseFromApiCall);

      if (responseFromApiCall.success) {
        toast.success("Block successful");
        // Update the guideData state to reflect the change in the UI
        setGuideData((prevGuideData) => {
          const updatedGuideData = prevGuideData.map((guide) =>
            guide._id === guideId ? { ...guide, isBlocked: true } : guide
          );

          console.log("Updated Guide Data:", updatedGuideData);
          return updatedGuideData;
        });
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleUnblock = async (guideId) => {
    try {
      const responseFromApiCall = await unblockGuide({ guideId });

      console.log("Unblock API Response:", responseFromApiCall);

      if (responseFromApiCall.success) {
        toast.success("User unblocked successfully.");
        // Update the guideData state to reflect the change in the UI
        setGuideData((prevGuideData) => {
          const updatedGuideData = prevGuideData.map((guide) =>
            guide._id === guideId ? { ...guide, isBlocked: false } : guide
          );

          console.log("Updated Guide Data:", updatedGuideData);
          return updatedGuideData;
        });
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <>
    <AdminSidebar></AdminSidebar>
      <div>
        <h3 className="Heading">Guide Management</h3>
      </div> 
      <div className="Table">
        <BootstrapForm>
          <BootstrapForm.Group
            className="mt-3"
            controlId="exampleForm.ControlInput1"
          >
            <BootstrapForm.Label>Search users:</BootstrapForm.Label>
            <BootstrapForm.Control
              style={{ width: "500px" }}
              value={searchQuery}
              type="text"
              placeholder="Enter Name or email........"
              onChange={handleSearch}
            />
          </BootstrapForm.Group>
        </BootstrapForm>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th> Name</th>

              <th>Email</th>
              <th>Location</th>
              <th>Charge</th>
              <th>Verified</th>

              <th>Block</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuides.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={user.profileImage}
                    alt={`Guide ${index}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  />
                </td>
                <td>
                  {user.firstname} {user.Lastname}
                </td>

                <td>{user.email}</td>

                <td>{user.Location}</td>
                <td>{user.price ? user.price : "not added"}</td>
                <td style={{ color: user.isAuthorized ? "green" : "red" }}>
                  {user.isAuthorized ? "verified" : "false"}
                </td>

                <td>
                  <Button
                    type="button"
                    variant={user.isBlocked ? "success" : "warning"}
                    className="mt-3 blockBtn"
                    disabled={isBlocking || isunBlocking} // Disable the button during API calls
                    onClick={() => {
                      if (user.isBlocked) {
                        // Unblock the user
                        handleUnblock(user._id);
                      } else {
                        // Block the user
                        handleBlock(user._id);
                      }
                    }}
                  >
                    {isBlocking || isunBlocking
                      ? "Processing..."
                      : user.isBlocked
                      ? "Unblock"
                      : "Block"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default GuideData;

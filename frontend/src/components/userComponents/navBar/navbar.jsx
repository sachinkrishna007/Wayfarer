// import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/userAuthSlice";
import { useLogoutMutation } from "../../../redux/slices/userApiSlice";
// import Button from "react-bootstrap/Button";
import "./navbar.css";

// const Navbars = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.auth);
//   console.log(userInfo);
//   const [logoutApiCall] = useLogoutMutation();
//   const logoutHandler = async () => {
//     try {
//       await logoutApiCall().unwrap();
//       dispatch(logout());
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <header>
//       <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
//         <Container>
//           <LinkContainer to="/">
//             <Navbar.Brand>
//               <img
//                 style={{ height: "50px", width: "auto", transform: "scale(2)" }}
//                 src="/wayfarerlogo.png"
//                 alt=""
//               />
//             </Navbar.Brand>
//           </LinkContainer>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />{" "}
//           {/* Navbar.Toggle for responsiveness */}
//           <Navbar.Collapse   id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               {userInfo ? (
//                 <>
//                   <LinkContainer to="/login" style={{ margin: "10px" }}>
//                     <Nav.Link className="bold-text">Home</Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/login" style={{ margin: "10px" }}>
//                     <Nav.Link>Guides</Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/login" style={{ margin: "10px" }}>
//                     <Nav.Link>Bookings</Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/login" style={{ margin: "10px" }}>
//                     <Nav.Link>
//                       <span style={{ padding: " 10px" }}>Profile</span>

//                       <img
//                         src={userInfo.profileImageName}
//                         alt="Bookings"
//                         className="menu-icon"
//                         style={{
//                           width: "auto", // Adjust the width to your desired size
//                           height: "25px",
//                           borderRadius: "100%", // Adjust the height to your desired size
//                         }}
//                       />
//                     </Nav.Link>
//                   </LinkContainer>
//                   <Button
//                     variant="outline-info"
//                     size="sm"
//                     onClick={logoutHandler}
                    
//                     className="logout"
//                   >
//                     Logout
//                   </Button>
       
//                   {/* <NavDropdown title={userInfo.firstname} id="username">
//                     <LinkContainer to="/profile">
//                       <NavDropdown.Item>Profile</NavDropdown.Item>
//                     </LinkContainer>
//                     <NavDropdown.Item onClick={logoutHandler}>
//                       Logout
//                     </NavDropdown.Item>
//                   </NavDropdown> */}
//                 </>
//               ) : (
//                 <>
//                   <LinkContainer to="/login">
//                     <Nav.Link>Sign In</Nav.Link>
//                   </LinkContainer>
//                   <LinkContainer to="/register">
//                     <Nav.Link>Sign Up</Nav.Link>
//                   </LinkContainer>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Navbars;




 




import React, { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

export default function NavBar() {
  const menubarStyle = {
    backgroundColor: "white", // Specify your desired background color here
    justifyContent: "space-between",
    alignItems: "center",
   
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  // State variable to hold the user name
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Set the user name when userInfo is available
    if (userInfo) {
      setUserName(userInfo.firstName); // Adjust the property to match your user data structure
    }
  }, [userInfo]);

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Define menu items for logged-in users
  const loggedInUserItems = [
    {
      label:  (<Link
          to="/homet"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Home

        </Link>),
      icon: "pi pi-fw pi-home custom-icon",
      // Add a link to the home page
 
    },
    {
      label: (
        <Link
          to="/guideList"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Guides

        </Link>
      ),
      icon: "pi pi-fw pi-users custom-icon",
      // Add a link to the guides page
     
    },
    {
      label: "Bookings",
      icon: "pi pi-fw pi-book custom-icon",
      // Add a link to the bookings page
      url: "/bookings",
    },

    {
      label: ` ${userName}`, // Dynamically include the user name
      icon: "pi pi-fw pi-user custom-icon",
      items: [
        {
          label: "profile",
          icon: "pi pi-fw pi-user ",
        },
      ],
    },
    // Other items for logged-in users
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off custom-icon",
      command: (event) => logoutHandler(event),
    },
  ];

  // Define menu items for sign-up and sign-in
  const signUpSignInItems = [
    {
      label: (
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Sign Up
        </Link>
      ),
      icon: "pi pi-user-plus",
      // Add a link to the sign-up page
    },
    {
      label: (
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Sign in
        </Link>
      ),
      icon: "pi pi-sign-in",
      // Add a link to the sign-in page
      url: "/signin",
    },
  ];

  // Determine which set of items to render based on the presence of userInfo
  const items = userInfo ? loggedInUserItems : signUpSignInItems;
    const navbarContainerStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    };

    const logoStyle = {
      margin: "0",
    };

  const start = (
    <div style={navbarContainerStyle}>
      <img alt="logo" src="/logos2.png" height="50" className="mr-2"></img>
    </div>
  );
  const end = <InputText  placeholder="Search" type="text" className="w-full" />;

  return (

    
    <div className="card">
      <Menubar model={items} start={start}  style={menubarStyle} />
    </div>
  );
}

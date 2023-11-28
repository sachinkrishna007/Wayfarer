import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
import NavBar from "../../../components/guideComponents/navbar/GuideNavbar";
import "./guideChat.css";
import {
  useGuideSendChatMutation,
  useGuidegetMessagesMutation,
  useGuidegetRoomsMutation,
} from "../../../redux/slices/guideSlice/guideApiSlice";
import { useSelector } from "react-redux";
export default function GuideChat() {
  const [sendChat] = useGuideSendChatMutation();
  const [getChat] = useGuidegetMessagesMutation();
  const [getRoom] = useGuidegetRoomsMutation();
  const [rooms, setRooms] = useState([]);
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const { guideInfo } = useSelector((state) => state.guideAuth);
   useEffect(() => {
     socket = io(ENDPOINT);
     socket.emit("setup", guideInfo);
     socket.on("connection", () => setSocketConnected(true));
   }, []);
  const sendHandler = async () => {
    if (content === "") {
      toast.error("Message cannot be empty");
      return;
    }
    try {
      const responseFromApiCall = await sendChat({
        sender: guideInfo.data._id,
        chatId: chatId,
        content: content,
        type: "Guide",
      });

      if (responseFromApiCall) {
        console.log(responseFromApiCall.data);
        setContent("");
        setMessageSent(true);
         socket.emit("new message", responseFromApiCall.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    let fetchRoom = async () => {
      let res = await getRoom({ guideId: guideInfo.data._id });

      if (res) {
        console.log(res);
        setRooms(res.data);
      }
    };

    fetchRoom();
  }, [guideInfo]);


    useEffect(() => {
      let fetchMessages = async () => {
        let res = await getChat({ chatId: chatId });

        if (res) {
          console.log(res);
          setChats(res.data);
          setMessageSent(false);
           socket.emit("join chat", chatId);
        }
      };
      if (chatId) {
        fetchMessages();
         selectedChatCompare = chats;
      }
    }, [chatId, messageSent]);

        useEffect(() => {
          socket.on("message received", (newMessageReceived) => {
            if (
              !selectedChatCompare ||
              chatId !== newMessageReceived.room._id
            ) {
            } else {
              setChats([...chats, newMessageReceived]);
            }
          });
        });
  return (
    <div>
      <NavBar></NavBar>

      <MDBContainer fluid className="py-5" style={{ backgroundColor: "" }}>
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <div className="p-3">
              <MDBInputGroup className="rounded mb-3">
                <input
                  className="form-control rounded"
                  placeholder="Search"
                  type="search"
                />
                <span className="input-group-text border-0" id="search-addon">
                  <MDBIcon fas icon="search" />
                </span>
              </MDBInputGroup>
              {rooms.length > 0 ? (
                rooms.map((chat, index) => (
                  <MDBTypography listUnStyled className="mb-0" key={index}>
                    <li className="p-2 border-bottom">
                      <a
                        href="#!"
                        className="d-flex justify-content-between"
                        onClick={() => {
                          setChatId(chat._id);
                          setUser(chat.user.firstName);
                        }}
                      >
                        <div className="d-flex flex-row">
                          <div>
                            <img
                              src={
                                chat.user.profileImageName
                                  ? chat.user.profileImageName
                                  : "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"
                              }
                              alt="avatar"
                              className="d-flex align-self-center me-3"
                              width="60"
                            />
                            <span className="badge bg-success badge-dot"></span>
                          </div>
                          <div className="pt-1">
                            <p className="fw-bold mb-0">
                              {chat.user.firstName}
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </MDBTypography>
                ))
              ) : (
                <div>
                  <h1>no chats</h1>
                </div>
              )}
            </div>
          </MDBCol>
          <MDBCol md="6" lg="7" xl="8">
            {chatId && (
              <div className="h-full d-flex flex-column justify-content-between">
                <div>
                  <h6 className="font-medium">{user}</h6>
                </div>
                <div className="bg-white p-5 chatBox">
                  {chats && chats.length > 0 ? (
                    chats.map((chat, index) => (
                      <div
                        key={index}
                        className={`d-flex flex-row justify-content-${
                          chat.senderType === "User" ? "start" : "end"
                        }  `}
                      >
                        <div>
                          <p
                            className={`small p-2 ${
                              chat.senderType === "User"
                                ? "userChat  rounded-3"
                                : "guideChat"
                            }`}
                          >
                            {chat.content}
                          </p>
                          <p
                            className={`small p-2-${
                              chat.senderType === "User" ? "start " : "end"
                            }`}
                          >
                            {chat.sentAt}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      No Chats
                    </div>
                  )}
                </div>
                <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                  <img
                    src={guideInfo.data.profileImage}
                    alt="avatar 3"
                    style={{ width: "40px", height: "100%" }}
                  />
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput2"
                    placeholder="Type message"
                  />
                  <div className="w-1/12">
                    <button
                      type="button"
                      onClick={sendHandler}
                      className="btb btn info"
                    >
                      Send
                    </button>
                  </div>
                  <a className="ms-1 text-muted" href="#!">
                    <MDBIcon fas icon="paperclip" />
                  </a>
                  <a className="ms-3 text-muted" href="#!">
                    <MDBIcon fas icon="smile" />
                  </a>
                  <a className="ms-3" href="#!">
                    <MDBIcon fas icon="paper-plane" />
                  </a>
                </div>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

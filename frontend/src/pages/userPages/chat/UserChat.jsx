import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../../components/userComponents/navBar/navBar";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
import "./userChat.css";
import { useSelector } from "react-redux";
import {
  useSendChatMutation,
  useGetMessagesMutation,
} from "../../../redux/slices/userApiSlice";
import { toast } from "react-toastify";
export default function UserChat() {
  const [sendChat] = useSendChatMutation();
  const [getChat] = useGetMessagesMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [rooms, setRooms] = useState([]);
  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);

  const [content, setContent] = useState("");
  const [messageSent, setMessageSent] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo);
    socket.on("connection", () => setSocketConnected(true));
  }, []);

  const sendHandler = async () => {
    if (content === "") {
      toast.error("Message cannot be empty");
      return;
    }
    try {
      const responseFromApiCall = await sendChat({
        sender: userInfo._id,
        chatId: chatId,
        content: content,
        type: "User",
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
    if (id !== "allchats") {
      setChatId(id);
    }
  }, [id]);

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
    }
     selectedChatCompare = chats;
  }, [chatId, messageSent]);

    useEffect(() => {
      socket.on("message received", (newMessageReceived) => {

        if (!selectedChatCompare || chatId !== newMessageReceived.room._id) {
        } else {
          setChats([...chats, newMessageReceived]);
        }
      });
    });

  return (
    <div>
      <NavBar />
      <div style={{ paddingTop: "60px" }}>
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
                <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Chat </h5>
                </MDBCardHeader>

                <MDBCardBody
                  className="chat-body"
                  style={{
                    maxHeight: "400px", // Set the maximum height for the chat body
                    overflowY: "auto", // Enable vertical scrollbar
                  }}
                >
                  {chats && chats.length > 0 ? (
                    chats.map((chat, index) => (
                        
                      <div
                        key={index}
                        className={`d-flex flex-row justify-content-${
                          chat.senderType === "User" ? "end" : "start"
                        } mb-2 pt-1`}
                      >
                        <div>
                          <p
                            className={`small p-2 ${
                              chat.senderType === "User"
                                ? "me-3 text-white bg-primary rounded-3 user-message"
                                : "ms-3 rounded-3 guide-message"
                            }`}
                          >
                            {chat.content}
                          </p>
                          <p
                            className={`receive  small me-3  mb-2 rounded-3  d-flex justify-content-${
                              chat.senderType === "User" ? "end" : "start"
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
                </MDBCardBody>

                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                  <img
                    src={userInfo.profileImageName}
                    alt=""
                    style={{ width: "45px", height: "100%" }}
                  />
                  <input
                    type="text"
                    value={content}
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Type message"
                    onChange={(e) => setContent(e.target.value)}
                  ></input>
                  <div className="w-1/12">
                    <button
                      type="button"
                      onClick={sendHandler}
                      className="btn btn-primary"
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
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}

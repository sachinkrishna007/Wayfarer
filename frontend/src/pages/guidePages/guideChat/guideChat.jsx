import React, { useState, useEffect } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from 'mdb-react-ui-kit'
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000'
var socket, selectedChatCompare
import NavBar from '../../../components/guideComponents/navbar/GuideNavbar'
import './guideChat.css'
import {
  useGuideSendChatMutation,
  useGuidegetMessagesMutation,
  useGuidegetRoomsMutation,
} from '../../../redux/slices/guideSlice/guideApiSlice'
import { useSelector } from 'react-redux'
export default function GuideChat() {
  const [sendChat] = useGuideSendChatMutation()
  const [getChat] = useGuidegetMessagesMutation()
  const [getRoom] = useGuidegetRoomsMutation()
  const [rooms, setRooms] = useState([])
  const [chatId, setChatId] = useState('')
  const [lastMessages, setLastMessages] = useState({})

  const [chats, setChats] = useState([])
  const [user, setUser] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [messageSent, setMessageSent] = useState(false)
  const { guideInfo } = useSelector((state) => state.guideAuth)
  const formatTime = (timestamp) => {
    const options = { hour: 'numeric', minute: 'numeric' }
    return new Date(timestamp).toLocaleTimeString('en-US', options)
  }
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', guideInfo)
    socket.on('connection', () => setSocketConnected(true))
  }, [])
  const sendHandler = async () => {
    if (content === '') {
      toast.error('Message cannot be empty')
      return
    }
    try {
      const responseFromApiCall = await sendChat({
        sender: guideInfo.data._id,
        chatId: chatId,
        content: content,
        type: 'Guide',
      })

      if (responseFromApiCall) {
        console.log(responseFromApiCall.data)
        setContent('')
        setMessageSent(true)
        socket.emit('new message', responseFromApiCall.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    const fetchRoom = async () => {
      let res = await getRoom({ guideId: guideInfo.data._id })

      if (res) {
        console.log(res)
        setRooms(res.data)

        const messagesPromises = res.data.map(async (room) => {
          const messages = await getChat({ chatId: room._id })
          const lastMessage = messages.data[messages.data.length - 1]
          return { roomId: room._id, lastMessage }
        })

        const messages = await Promise.all(messagesPromises)
        const lastMessagesMap = messages.reduce(
          (acc, { roomId, lastMessage }) => {
            acc[roomId] = lastMessage
            return acc
          },
          {},
        )

        setLastMessages(lastMessagesMap)
      }
    }

    fetchRoom()
  }, [guideInfo])

  useEffect(() => {
    let fetchMessages = async () => {
      let res = await getChat({ chatId: chatId })

      if (res) {
        console.log(res)
        setChats(res.data)
        setMessageSent(false)
        socket.emit('join chat', chatId)
      }
    }
    if (chatId) {
      fetchMessages()
      selectedChatCompare = chats
    }
  }, [chatId, messageSent])

  useEffect(() => {
    const scrollToBottom = () => {
      const chatBody = document.getElementById('chat-box')
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight
      }
    }

    // Scroll to bottom when component mounts
    scrollToBottom()
    socket.on('message received', (newMessageReceived) => {
      if (!selectedChatCompare || chatId !== newMessageReceived.room._id) {
      } else {
        setChats([...chats, newMessageReceived])
        scrollToBottom()
      }
    })
  })
  return (
    <div>
      <NavBar></NavBar>

      <MDBContainer
        fluid
        className="py-5"
        style={{ backgroundColor: '#ededed' }}
      >
        <MDBRow>
          <MDBCol
            md="6"
            lg="5"
            xl="4"
            className="mb-4 mb-md-0"
            style={{ backgroundColor: '' }}
          >
            <div className="p-3">
              <MDBInputGroup className="rounded mb-3">
                <h3>Chats</h3>
              </MDBInputGroup>
              {rooms.length > 0 ? (
                rooms.map((chat, index) => (
                  <MDBTypography listUnStyled className="mb-0" key={index}>
                    <li className="p-2 border-bottom">
                      <a
                        href="#!"
                        className="d-flex justify-content-between"
                        onClick={() => {
                          setChatId(chat._id)
                          setUser(chat.user.firstName)
                          setImage(chat.user.profileImageName)
                        }}
                      >
                        <div className="d-flex flex-row">
                          <div>
                            <img
                              src={
                                chat.user.profileImageName
                                  ? chat.user.profileImageName
                                  : 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg'
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
                            {lastMessages[chat._id] && (
                              <p className="small text-muted mb-0">
                                {lastMessages[chat._id].content}
                              </p>
                            )}
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
                <div className="d-flex align-items-center p-3">
                  <img
                    src={
                      image
                        ? image
                        : 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg'
                    }
                    alt=""
                    className="rounded-circle me-3"
                    style={{ width: '50px', height: '50px' }}
                  />
                  <h3
                    className="mb-0"
                    style={{
                      backgroundColor: '#ededed',
                      color: 'black',
                      height: '50px',
                      lineHeight: '50px',
                      paddingLeft: '15px',
                      borderRadius: '0 10px 10px 0',
                    }}
                  >
                    {user}
                  </h3>
                </div>
                <div className="bg-white p-5 chatBox " id="chat-box">
                  {chats && chats.length > 0 ? (
                    chats.map((chat, index) => (
                      <div
                        key={index}
                        className={`d-flex flex-row justify-content-${
                          chat.senderType === 'User' ? 'start' : 'end'
                        }  `}
                      >
                        <div>
                          <p
                            className={`small p-2 ${
                              chat.senderType === 'User'
                                ? 'userChat  rounded-3'
                                : 'guideChat'
                            }`}
                          >
                            {chat.content}
                          </p>
                          <p className="small text-muted">
                            {formatTime(chat.createdAt)}
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
                    style={{ width: '40px', height: '100%' }}
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
  )
}

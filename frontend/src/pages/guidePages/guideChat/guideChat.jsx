import React, { useState, useEffect } from 'react'
import data from '@emoji-mart/data'

import Picker from '@emoji-mart/react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from 'mdb-react-ui-kit'
import io from 'socket.io-client'

const ENDPOINT = 'https://sachinkrishna.me'
var socket, selectedChatCompare
import NavBar from '../../../components/guideComponents/navbar/GuideNavbar'
import { Button } from 'primereact/button'
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
  const [typing, SetTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
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
   let previousTime = null
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const handleEmojiSelect = (emoji) => {
    setContent((prevContent) => prevContent + emoji)
    setShowEmojiPicker(false)
  }
  const addEmoji = (e) => {
    const sym = e.unified.split('_')
    const codeArray = []
    sym.forEach((el) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    setContent(content + emoji)
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit('setup', guideInfo)
    socket.on('connection', () => setSocketConnected(true))
    socket.on('typing', () => setIsTyping(true))
    socket.on('stop typing', () => setIsTyping(false))
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
        setShowEmojiPicker(false)
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

  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    //typjng indicator
    if (!socketConnected) return

    if (!typing) {
      SetTyping(true)
      socket.emit('typing', chatId)
    }
    let lastTypingTime = new Date().getTime()
    let timerLength = 3000
    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDiff = timeNow - lastTypingTime

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', chatId)
        SetTyping(false)
      }
    }, timerLength)
  }
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
                              style={{ borderRadius: '100px', height: '60px' }}
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
                <div className="d-flex align-items-center p-3 " style={{border:'200px'}}>
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
                  <h4
                    className="mb-0 NameHeading"
                   
                  >
                    {user}
                  </h4>
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
                                ? 'userChat rounded-3'
                                : 'guideChat'
                            }`}
                          >
                            {chat.content}
                          </p>
                          <p
                            style={{
                              float: 'right',
                              marginTop: '5px', // Adjust the margin-top for vertical positioning
                              fontSize: '10px', // Adjust the font size as needed
                             
                            }}
                          >
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
                    style={{
                      width: '40px',
                      height: '80%',
                      borderRadius: '10px',
                      marginRight: '9px',
                    }}
                  />
                  {isTyping ? <div>typing...</div> : <></>}
                  <input
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value)
                      typingHandler
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault() // Prevents a newline character from being inserted
                        sendHandler() // Call your sendHandler function when Enter is pressed
                      }
                    }}
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput2"
                    placeholder="Type message"
                  />
                  <Button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    style={{
                      height: '44px',

                      marginLeft: '9px',
                      borderRadius: '10px',
                      textAlign: 'center',
                    }}
                  >
                    😊
                  </Button>
                  <div className="w-1/12">
                    <Button
                      type="button"
                      onClick={sendHandler}
                      icon="pi pi-send" // Change this to the PrimeReact icon you want
                      className="p-button-info"
                      style={{
                        height: '44px',
                        marginLeft: '5px',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                  <a className="ms-1 text-muted" href="#!">
                    <MDBIcon fas icon="paperclip" />
                  </a>

                  <div className="ms-3 position-relative">
                    {showEmojiPicker && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '100%',
                          marginBottom: '40px',
                          right: 0,
                        }}
                      >
                        <Picker
                          set="apple"
                          onSelect={(emoji) => handleEmojiSelect(emoji.native)}
                          onEmojiSelect={addEmoji}
                        />
                      </div>
                    )}
                  </div>

                  <a className="ms-3" href="#!">
                    <MDBIcon fas icon="paper-plane" />
                  </a>

                  {/* <Picker data={data} onEmojiSelect={console.log} /> */}
                </div>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

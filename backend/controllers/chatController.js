import asyncHandler from "express-async-handler";
import ChatRoom from "../models/chatRoom.js";
import ChatMessage from "../models/chatMessages.js";

const createRoom = asyncHandler(async (req, res) => {
  console.log("here");
  try {
    const { userId, guideId } = req.body;

    let chatRoom = await ChatRoom.findOne({
      user: userId,
      guide: guideId,
    });

    if (!chatRoom) {
      chatRoom = new ChatRoom({
        user: userId,
        guide: guideId,
        messages: [],
      });
      await chatRoom.save();
    }

    const roomDetails = await ChatRoom.findOne({ _id: chatRoom._id }).populate({
      path: "guide",
      select: "_id firstname profileImage ",
    });

    res.status(200).json(roomDetails);
  } catch (error) {
    res.status(500).json({ message: "Error creating or getting chat room" });
  }
});

const chatSend = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { content } = req.body;
  const { chatId, sender, type } = req.body;

  // Create a new chat message
  const newMessage = new ChatMessage({
    room: chatId,
    sender: sender,
    senderType: type,
    content: content,
  });

  // Save the chat message
  await newMessage.save();
  console.log("here");
  let chatRoom = await ChatRoom.findOne({ _id: chatId });
  if (chatRoom) {
    chatRoom.messages.push(newMessage._id);
  }
  await chatRoom.save();

  // Populate the sender field with specific fields (_id, name, email)
  // and also populate the nested fields room.user and room.doctor
  await newMessage.populate([
    { path: "sender", select: "_id  email" },
    {
      path: "room",
      populate: [
        { path: "user", select: "_id  email" },
        { path: "guide", select: "_id  email" },
      ],
    },
  ]);

  // Return the chat message with all populated fields
  res.status(200).json({ newMessage });
});

const getRooms = asyncHandler(async (req, res) => {
  const { user } = req.params;
  const rooms = await ChatRoom.find({ user: user }).populate({
    path: "guide",
    select: "_id firstname email profileImage",
  });
  if (rooms) {
    res.status(200).json(rooms);
  } else {
    res.status(400).json({ message: "Failed to fetch rooms" });
  }
});

//guideside
const getGuideRooms = asyncHandler(async (req, res) => {
    console.log(req.body);
  const { guideId } = req.body;
 
  const rooms = await ChatRoom.find({ guide: guideId }).populate({
    path: "user",
    select: "_id  email firstName profileImageName",
  });
  if (rooms) {
    res.status(200).json(rooms);
  } else {
    res.status(400).json({ message: "Failed to fetch rooms" });
  }
});

const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.body

  try {
    // Sort messages in ascending order of createdAt
    const messages = await ChatMessage.find({ room: chatId }).sort({
      createdAt: 1,
    });

    if (messages) {
      res.status(200).json(messages);
    } else {
      res
        .status(404)
        .json({ message: "No messages found for the given room." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export { createRoom, chatSend, getRooms, getGuideRooms, getMessages };

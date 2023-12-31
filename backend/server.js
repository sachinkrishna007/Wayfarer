import path from 'path'
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import guideRoutes from "./routes/guideRoutes.js";
import AdminRoutes from "./routes/adminRoutes.js";
import stripeRoutes from "./routes/stripe.js";
import cors from "cors";
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir);
const app = express();
connectDB();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(express.static("backend/public"));
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/guide", guideRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/stripe", stripeRoutes);

if (process.env.NODE_ENV === 'production'){
   const __dirname = path.resolve();
   app.use(express.static(path.join(parentDir, "/frontend/dist")));

   app.get("*", (req, res) =>
     res.sendFile(path.resolve(parentDir, "frontend", "dist", "index.html"))
   );

}else{

  app.get("/", (req, res) => res.send("wayfarer is ready "));
}

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => console.log(`server started on ${port}`));

import { Server } from "socket.io";

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://sachinkrishna.me/"],
  },
});

io.on("connection", (socket) => {
  console.log("connected with socket io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(room);
    console.log("User Joined room:" + room);
  });

  socket.on("typing", (room) => {
    console.log("aaddas");
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new follower", (newfollower) => {
    const guideId = newfollower.responseFromApiCall.guide?._id;
    const notification = newfollower.responseFromApiCall.notification;
   

    if (guideId) {
      socket.to(guideId).emit("new notification", {
        notification,
      });
    }
  });


 

  socket.on("new message", (newMessageReceived) => {
    console.log(newMessageReceived, "bjhbjh");
    var chat = newMessageReceived.newMessage.room;
    console.log("chat", chat);
    if (!chat.user || !chat.guide) {
      return console.log("chat.users not defined");
    }

    socket.to(chat._id).emit("message received", newMessageReceived.newMessage);
  });
});

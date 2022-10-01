import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { addUser, getUser, getUsers, removeUser } from "./db.js";

const port = process.env.PORT || 5000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Simple Chat Room server.");
});

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }) => {
    addUser(socket.id, username, room);
    socket.join(room);
    socket.broadcast.to(room).emit("chat", {
      at: new Date().getTime(),
      message: `${username} has joined the chat.`,
    });
    io.to(room).emit(
      "available",
      getUsers(room).map((user) => user.username)
    );
  });

  socket.on("disconnect", () => {
    const removed = removeUser(socket.id);
    if (!removed) return;

    const { username, room } = removed;
    io.to(room).emit("chat", {
      at: new Date().getTime(),
      message: `${username} has left the chat.`,
    });
    io.emit(
      "available",
      getUsers(room).map((user) => user.username)
    );
  });

  socket.on("chat", (payload) => {
    const { room, username } = getUser(socket.id);
    io.to(room).emit("chat", {
      ...payload,
      at: new Date().getTime(),
      from: username,
    });
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
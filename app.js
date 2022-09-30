import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
expressWs(app);

app.use(cors());
app.use(express.json());

const messages = [];
const sockets = [];

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Simple Chat Room server.");
});

app.get("/messages", (req, res) => {
  res.status(200).send(messages);
});

app.post("/messages", (req, res) => {
  const message = req.body;
  messages.push(message);

  broadcastMessages(JSON.stringify(message));
  res.sendStatus(200);
});

app.ws("/chat", (socket) => {
  sockets.push(socket);

  socket.on("message", (message) => {
    messages.push(message);
    broadcastMessages(message);
  });

  socket.on("close", () => {
    sockets.splice(sockets.indexOf(socket), 1);
  });
});

// UTILS
function broadcastMessages(message) {
  for (let i = 0; i < sockets.length; i++) {
    sockets[i].send(message);
  }
}

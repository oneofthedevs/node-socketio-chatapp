//! Imports
// const app = require("express")();
// app.use(require("body-parser").json());
// app.use(require("cors")());
require("dotenv").config();
const io = require("socket.io")(process.env.PORT, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("message-sent", (message) => {
    socket.broadcast.emit("chat-message", message);
  });
  socket.on("new-user", (name) => {
    console.log(`${name} has joined`);
    socket.broadcast.emit("add-user", name);
  });
});

io.on("disconnect", (socket) => {
  console.log(`User disconnected`);
});
// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port: ${process.env.PORT}`);
// });

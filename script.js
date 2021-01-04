const FORM = document.querySelector("#form");
const IP = document.querySelector("#message");
const BOX = document.querySelector("#message-box");

const socket = io(`http://127.0.0.1:3456`);

socket.on("chat-message", (data) => {
  console.log(data);
  addMessage(data, true);
});

socket.on("add-user", (name) => {
  const div = document.createElement("div");
  div.innerHTML = `${name} has joined the chat`;
  BOX.appendChild(div);
});

FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("message-sent", IP.value);
  addMessage(IP.value, false);
  IP.value = "";
});

const addMessage = (message, isRec) => {
  const div = document.createElement("div");
  isRec
    ? div.classList.add("message-text-rec")
    : div.classList.add("message-text");
  div.innerHTML = message;
  BOX.appendChild(div);
};

const newUser = () => {
  const name = prompt("Enter your name");

  name ? socket.emit("new-user", name) : newUser();
};

newUser();

// Referencias del HTML
const button = document.querySelector("button");
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");

const socket = io();

socket.on("connect", () => {
  button.disabled = false;
});

socket.on("disconnect", () => {
  button.disabled = true;
});

socket.on("last-ticket", (last) => {
  lblNuevoTicket.innerText = "Ticket: " + last;
});

button.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});

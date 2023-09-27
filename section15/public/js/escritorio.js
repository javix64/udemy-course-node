const lblDesktop = document.querySelector("h1");
const btnRespond = document.querySelector("button");
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has("desktop")) {
  window.location = "index.html";
  throw new Error("Desktop is mandatory");
}
const desktop = searchParams.get("desktop");
lblDesktop.innerText =  `Escritorio ${desktop}`;
divAlert.style.display = 'none';
const socket = io();

socket.on("connect", () => {
  btnRespond.disabled = false;
});

socket.on("disconnect", () => {
  btnRespond.disabled = true;
});

// socket.on("last-ticket", (last) => {
//   lblNuevoTicket.innerText = "Ticket: " + last;
// });

btnRespond.addEventListener("click", () => {
    
  socket.emit("respond-ticket", {desktop}, ({ok,ticket,msg}) => {
    if(!ok){
        lblTicket.innerText = 'No one'
        return divAlert.style.display = "";
    }
    lblTicket.innerText= `Ticket ${ticket.number}`
    
  });
});
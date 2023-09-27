const lblDesktop = document.querySelector("h1");
const btnRespond = document.querySelector("button");
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPendientes');

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

socket.on("pending-tickets", (pending) => {
  if(pending === 0){
    lblPending.style.display = 'none';
  }else{
    lblPending.style.display = '';
    lblPending.innerText = pending;
  }
});

btnRespond.addEventListener("click", () => {
  socket.emit("respond-ticket", {desktop}, ({ok,ticket,msg}) => {
    if(!ok){
        lblTicket.innerText = 'No one'
        return divAlert.style.display = "";
    }
    lblTicket.innerText= `Ticket ${ticket.number}`
    
  });
});
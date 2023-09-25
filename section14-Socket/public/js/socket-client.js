const span0 = document.getElementsByTagName('span')[0];
const span1 = document.getElementsByTagName('span')[1];
const input = document.getElementsByTagName('input')[0];
const button = document.getElementsByTagName('button')[0];

const socket = io();

socket.on('connect',()=>{
    span0.style.display = '';
    span1.style.display = 'none';
})

socket.on('disconnect',()=>{
    span0.style.display = 'none';
    span1.style.display = '';
})

socket.on('send-msg', (payload)=>{
    console.info(payload);
})

button.addEventListener('click', ()=> {
    const msg = input.value;
    const payload = {
        msg,
        id:'1234',
        date: new Date().getTime()
    }

    socket.emit('send-msg', payload,(id)=>{
        console.info('From server=>',id);
    });
})
const http = require('http');
const port = 3000;

// create http server with port 3000
http.createServer((req, res)=>{
    // send a file in json format.
    res.setHeader('Content-Disposition', 'attachment; filename=list.json')
    res.writeHead(200,{'Content-type':'application/json'});
    const data = {
        people:[
            {id:1,name:'Javier'},
            {id:2,name:'Alvaro'},
            {id:3,name:'Lucia'},
            {id:3,name:'Clara'},
        ]
    }
    res.write(JSON.stringify(data));
    res.end();
})
.listen(port);

console.log('Listening port:', port);
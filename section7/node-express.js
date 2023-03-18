require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.get('/',(req,res)=>{
    res.render('home', {
        name: 'Javier',
        title: 'Node course'
    });
})

app.get('/generic',(req,res)=>{
    res.render('generic', {
        name: 'Javier',
        title: 'Node course'
    });
})
app.get('/elements',(req,res)=>{
    res.render('elements', {
        name: 'Javier',
        title: 'Node course'
    });
})

// Serve static content from template
app.use( express.static('public') );
// typical routes (just an example)
// app.get('/', (req, res)=>{
//     res.send('Home Page');
// })
// app.get('/hello-world',(req,res)=>{
//     res.send('Hello World');
// })

// render for template that i have download from the course

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/public/index.html');
// })
// app.get('/generic',(req,res)=>{
//     res.sendFile(__dirname + '/public/generic.html');
// })
// app.get('/elements',(req,res)=>{
//     res.sendFile(__dirname + '/public/elements.html');
// })


// in case that you want another page, app will call this function

// app.get('*',(req,res)=>{
//     // res.sendFile for sending
//     res.sendFile(__dirname +'/publicTemplate/404.html');
// })

app.listen(port,()=>{
    console.log(`Express app listening at http://localhost:${port}`);
});
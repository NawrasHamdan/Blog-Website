const express = require('express');
const ejs = require('ejs');
const { urlencoded, response } = require('express');
const app = express();

app.use(urlencoded({extended:true}))
app.use(express.static('public'));
app.set('view engine','ejs');

const port = 3000;
app.listen(port,()=>console.log('serverstarted'));

let counter =1; 

const myPosts = {counter:["post title","hello guys<3"]};

app.get('/',(req,res)=>{

    res.render('home',{myPosts:myPosts});
})

app.get('/contactme',(req,res)=>{

    res.render('contactme');
})

app.get('/about',(req,res)=>{

    res.render('about');
})



app.get('/compose',(req,res)=>{

    res.render('compose');
})




app.post('/compose',(req,res)=>{
    counter++;
    console.log(counter);

})
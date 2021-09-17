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

let posts = [{postId:counter,title:'Lorem Ipsum',content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris risus sem, porttitor sed vehicula et, convallis non felis. Nunc venenatis dapibus justo, sit amet varius augue sollicitudin at. Maecenas in elit dictum, pulvinar libero a, pharetra tortor. Nam cursus faucibus ex quis dictum. Sed a eros fringilla, congue est ac, efficitur libero. Vestibulum nec pulvinar mauris, quis tincidunt ligula. Suspendisse potenti. Curabitur elementum odio ut lectus maximus, sit amet lobortis est imperdiet. Suspendisse potenti. Mauris eget tincidunt nunc, a molestie erat."}];

app.get('/',(req,res)=>{
    
    res.render('home',{posts:posts});
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
    const post = {
        postId:counter,
        title:req.body.postTitle,
        content:req.body.postBody
    };
    posts.push(post);
    res.redirect('/');
})

app.get('/:postId',(req,res)=>{
    let search = req.params.postId;
    let page =[]
    for (let index = 0; index < posts.length; index++) {
        if (search==posts[index].postId) {
         page = [posts[index].title, posts[index].content];
         break;   
        }
    }
    res.render('post',{page:page});
    
})
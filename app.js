const express = require('express');
const ejs = require('ejs');
const { urlencoded, response } = require('express');
const app = express();
app.use(urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs');
const port = 3000;
app.listen(port, () => console.log('serverstarted'));
/////////////////////////////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect("mongodb+srv://admin_user:jOnMb0dzqqpxnBqN@cluster0.rartd.mongodb.net/Blog");
const postSchema = Schema({
    title: {
        type: String,
        require: true,
        auto: false
    },
    content: {
        type: String,
        required: true,
        auto: false
    }
})
const Post = mongoose.model('Post',postSchema,"posts");

app.get('/', (req, res) => {

    Post.find((err,data)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('home',{data,data});
        }
    });
})

app.get('/contactme', (req, res) => {

    res.render('contactme');
})

app.get('/about', (req, res) => {

    res.render('about');
})

app.get('/compose', (req, res) => {

    res.render('compose');
})

app.post('/compose', (req, res) => {
    
    const post = {
        title:req.body.title,
        content:req.body.content
    }
    Post.create(post,(err)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('home');
        }
    });

});

app.get('/:id', (req, res) => {
    const _id = req.params.id;
    Post.findOne({_id:_id},(err,data)=>{
        console.log(data);
        if (err) {
            console.log(err);
        } else {
            res.render('post', { data: data });
        }
    })
})
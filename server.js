const express = require("express");
const logger =  require('morgan');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
require("dotenv").config();
const app = express();
app.use(logger('dev'));
app.use(cookieParser());
const PORT = process.env.PORT ? process.env.PORT : 3003;
const db = require('./db')
const Users= require('./models/user.js');
app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}));

app.get('/', (req,res) =>{
res.render('index.ejs',{name: 'Saydooo'})
})


app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/register', async (req,res) => {
    try {
        const userInDatabase = await Users.findOne({email: req.body.email})
        if (userInDatabase){

            res.cookie('message', 'Email Already Exists', { maxAge: 5000 });
            return res.redirect("/login");
        }
        const hashedPassword=await bcrypt.hash(req.body.password,12)
        req.body.password=hashedPassword;
        req.body.id=Date.now().toString();
        const user = await Users.create(req.body)
        res.redirect('/login')
    } catch (error) {
      res.redirect('/register')  
    }
    console.log(req.body)
})

app.get('/register', (req,res)=>{
    res.render('register.ejs')
})

app.post('/register',(req,res)=>{

})





app.listen(PORT,console.log((`Working on port ${PORT}`))
)
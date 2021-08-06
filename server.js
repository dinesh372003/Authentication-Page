const express=require("express");
const app=express();
const ejs=require("ejs");
const mongoose=require("mongoose");
const router=require("./routers/user.js");
const {ensureAuthenticated}=require("./dash.js");
const session=require("express-session");
const flash = require('connect-flash');
const passport=require("passport");
require("./passport")(passport);   
app.use(express.static("Styles"));
app.use(express.urlencoded({extended:true}));
const database="mongodb+srv://Dinesh:Dinesh789@poll.em4re.mongodb.net/Task-3?retryWrites=true&w=majority";
mongoose.connect(database,{useNewUrlParser:true,useUnifiedTopology: true})
    .then((result)=>
    {
        app.listen(3000);
        console.log("Listening on Port 3000");
    })
    .catch((err)=>console.log(err))

    
app.use(session({
secret:"secret",
resave:true,
saveUninitialized:true
}));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.redirect("user/register")
})
app.get("/dashboard",ensureAuthenticated,(req,res)=>{
    res.render("dashboard",
    {
        name:req.user.name
    });
})
app.use("/user",router);``



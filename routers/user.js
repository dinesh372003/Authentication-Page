const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const passport=require("passport");
const user=require("../models/user Schema.js")
router.get("/login",(req,res)=>{res.render("login");});
router.get("/register",(req,res)=>{res.render("register")});



router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
  });
  
   

router.post("/register",(req,res)=>{
    try
        {
            let flag=0;
            console.log("register");
            const {name,email,password}=req.body;
            console.log({name,email,password});
          
              const User= new user({name,email,password});
              

                //hash password
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(User.password,salt,(err,hash)=>
                    {
                        if(err){console.log(err);}  
                        User.password=hash; 
                        User.save()
                            .then((result)=>res.redirect("/user/login"))
                            .catch((err)=>console.log(err)) 
                      
                    })});   
        }
        catch(err)
            {
                console.log(err);
            }
});

router.get("/logout",(req,res)=>{req.logout();res.redirect("/user/login");})

module.exports=router;
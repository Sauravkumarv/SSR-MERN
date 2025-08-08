const express=require('express');
const staticRouter=express.Router();
const URL = require("../model/url");


 staticRouter.get ('/home',async(req,res)=>{
  if(!req.user) return res.redirect('/login')
const result=await URL.find({createdBy:req.user._id})
   res.render('home',{data:result})
  })

  

  staticRouter.get('/', (req, res) => {
    res.redirect('/home');
  });

module.exports=staticRouter;
const USER=require('../model/user')
const { v4: uuidv4 } = require('uuid');
const {setUser,getUser}=require('../services/auth')

const createUser=async (req,res)=>{
const{username,email,password}=req.body;

const newUser=await USER.create({
  username,
  email,
  password,
})
return res.redirect('/login').json({user:newUser})

}


const loginUser= async(req,res)=>{
  const {email,password}=req.body;

  const user=await USER.findOne({email,password})
  if(!user){
    return res.render('login',{error:"Invalid Username and password"})
  }
  const sessionId=uuidv4();
  setUser(sessionId,user)
  res.cookie("uid",sessionId)
  return res.redirect('/home')

}



module.exports={createUser,loginUser}
const express=require('express')
const {createUser,loginUser}=require('../controller/user')

const router=express.Router();


router.get('/signin',(req,res)=>{
return res.render('signin')
})
router.post('/signin',createUser)



router.get('/login',(req,res)=>{
  res.render('login')
})

router.post('/login',loginUser)




module.exports=router;
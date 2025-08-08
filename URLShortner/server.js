const express=require('express')
const dotenv=require('dotenv');
const dbConnect=require("./config/db")
const path=require('path')
const cors=require('cors');
const cookieParser=require('cookie-parser')
const {restricToLoggedinUserOnly,checkAuth}=require('./middleware/auth')
const router=require('./routes/urlRoute')
const staticRouter=require('./routes/staticRoute')
const user=require("./routes/userRoute")

dotenv.config();
const app=express();

dbConnect();
app.set('view engine','ejs');

app.set('views',path.resolve('./views'));


app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieParser());




app.use('/api',restricToLoggedinUserOnly,router)
app.use('/',checkAuth,staticRouter)
app.use('/',user)




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const port=process.env.PORT || 4005;
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`)
})

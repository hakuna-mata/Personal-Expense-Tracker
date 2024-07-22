const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const flash = require("connect-flash")
const path = require("path")
const User = require("./models/user.js")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
dotenv.config()
const PORT = process.env.PORT;
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const cors = require("cors")
const app = express();
app.use(cookieParser("supersecret"))
const sessionOptions = {
    secret: 'mySuperSecretCode',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 14 * 24 * 60 * 60 * 1000,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  }

async function main(){
   await mongoose.connect(process.env.MONGO_URL);
   console.log("MongoDB connection successful");
}

main()

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))

app.use(cors({
  origin: 'http://localhost:5173', // React app's origin
  credentials: true,
}));


app.use(session(sessionOptions));
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.user = req.user;
    next()
})

const userRouter = require("./routes/users.js")
const expenseRouter = require("./routes/expenses.js")
// const indexRouter = require("./routes/index.js")

app.get("/root",(req,res)=>{
  console.log(req.user)
  res.send("Working")
})


app.use("/users",userRouter)
app.use("/expenses",expenseRouter)

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).json({ message });
});


app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
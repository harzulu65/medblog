const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-Parser")
const cookieParser = require("cookie-Parser")
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()

// bring routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');


// app
const app = express();

// DB
mongoose
    .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=> console.log('DB connected', process.env.DATABASE_LOCAL));

// middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser())

// cors THIS IS ONLY FROM BROWSER TO BROWSER COMMUNICATION
// IT DOESN AFFECT POSTMAN TESTING, INITIALLY IS ONLY FOR DEVELOPMENT

if(process.env.NODE_ENV =='development'){
    app.use(cors({ origin: `${process.env.CLIENT_URL}`}));
}

// routes middleware all routes will have the prefix "/api"
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// // routes just to start the app replace with the above blogRoutes
app.get("/api", (req, res) => {
    res.json({time: Date().toString()})
})

// port

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const ordersRouter = require("./routers/ordersRouter")
const rollsRouter = require("./routers/rollsRouter")
const customersRouter = require("./routers/customersRouter")
const usersRouter = require("./routers/usersRouter")
const handleError = require('./controllers/errController')
const AppError = require('./utils/AppError')
const passport = require('passport');
const session = require('express-session');
const cors = require("cors")
const app = express();



app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Implement CORS
// Access-Control-Allow-Origin *
app.use(
    cors({
      origin: "http://localhost:3000", // location of the react app
      credentials: true,
    })
    );
    
// Express session
app.use(
  session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 1000 }
  })
  );

app.use(cookieParser("secretcode"));
        
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport')(passport);

// Routers
app.use("/orders", ordersRouter)
app.use("/rolls", rollsRouter)
app.use("/customers", customersRouter)
app.use("/users", usersRouter);

// If URL is not found
app.use("*", (req, res, next) =>{
    next(new AppError(404, `Can't find ${req.originalUrl} on this server!`))
});

// Global error handling middleware
app.use((err,req, res, next) => {
    
    handleError(err,res)
})

module.exports = app;
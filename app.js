const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utility/ExpressError.js');
const session = require('express-session');
const User = require('./models/user.js');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
    secret: "MysuperSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+1000*60*60*24,
        maxAge: 1000*60*60*24*3,
        httpOnly: true
    }
}

main()
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

app.get('/', (req, res) => {
    res.send('I am Working properly!');
});

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.curUser = req.user;
    next();
})

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).render('error.ejs', { message });
});



app.listen(8080, () => {
    console.log('server is listening on port 8080!');
});

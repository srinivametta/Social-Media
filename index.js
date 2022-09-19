const express=require('express');
const port=8000;
const app=express();
const db=require('./config/mongoose');
const bodyParser=require('body-parser');
const session=require('express-session');
require('./config/passport-local-strategy');
const passport = require('passport');
const MongoStore=require('connect-mongo');

app.use(bodyParser.urlencoded({extended:false}));



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:"bhimSocial",
    secret:"blahblah",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*10)
    },
    store:MongoStore.create(
        {
            mongoUrl:db._connectionString, //it has the mongoDB link
            autoRemove:'disabled'
        },
        function (err) {
            if (err) {
                console.log(err);
            }
            else{
                console.log('mongo store activated');
            }
        }
    )
}));


app.use(passport.authenticate('session'));


app.use(passport.setAuthenticatedUser);
    
app.use('/',require('./route/index'));


app.listen(port,function (err) {
    if (err) {
        console.log(err);
    }
    else{
        console.log(`App is up and running at port ${port}`);
    }
});
// Dependencies
const express = require('express');
const session = require( 'express-session' );
const flash = require( 'express-flash' );

//Importing routes
const {DogRouter} = require(  './server/routes/dogRouter');
//importing database from server folder
require( './server/config/database' );
// Create express app
const app = express();

app.use( flash() );
app.use( express.urlencoded({extended:true}) );
app.use( express.json() );
app.use( session({
    secret: "dogs",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000  }
}));

//process.env.SESSION_TOKEN

// Tell server where views are and what templating engine I'm using
app.set("views", __dirname + "/client/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/client/static"));

app.use( '/', DogRouter);


app.listen(8080, function(){
    console.log("The Dogs server is running in port 8080.");
});
//require library
const mongoose=require('mongoose');

//connect database
mongoose.connect('mongodb://localhost/contact-list-db');

//aquire database to check connection in successful;
const db=mongoose.connection;

//error
db.on('Error',console.error.bind(console,'Error connecting to db'));

//up and running then print message
db.once('open',function()
{
    console.log('Successfully connected to database');
})
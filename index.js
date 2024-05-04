const express=require('express');

const port=8004;

const app=express()

const passport=require('passport');
const passportjwt=require('./config/passport')
const db=require('./config/mongoose');


app.use(express.urlencoded());

app.use('/',require('./routes'))

app.listen(port,function(err)
{
    if (err)
    {
        console.log(err);
    }
    console.log('yup server is running on port',port);
})
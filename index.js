const express = require('express');
const app = express();
require('./db');

app.post('/signup', (req, res)=>{
    
    if( role === 'admin'){
        
    }
    else if( role === 'parent'){
        // check if parent exists
        // Check if their children exists
        // create parent
    }
    else if( role === 'student'){
        // check if they already exists
        // create student
    }
})

app.post('/login',(req,res)=>{
    if( user === 'admin'){
        // check if admin exists 
    }
    else if ( user === 'student'){
        // Check if student exists 
    }
    else if( user === 'parent'){
        // check if parent exists
    }
})

app.get('/apply', (req,res)=>{
    // check if student is logged in
    // logic for granting leave
})

app.get('/grant', (req, res)=>{
    if( user === 'admin' ){
        // check if logged in
        // check if parent granted permission 
        // grant or decline permission
    }
    if( user === 'parent'){
        // check if logged in 
        // grant permission -> have to wait for admin to authorize
    }
})

app.listen(8080,()=>{
    console.log('listening to port 8080');
})
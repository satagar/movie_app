const express=require('express');
const mongoose= require('mongoose');
const router=require('./routes/route');
const app=express();

app.use(express.json());


const port=8080;

mongoose.set('strictQuery',true);
mongoose.connect('mongodb://localhost/moviedb',{family:4},(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("database connected successfully")

        app.listen(port,()=>{
            console.log(`server started at port: ${port}`)
        })
    }
})

app.use(router);

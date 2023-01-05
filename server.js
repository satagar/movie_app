const mongoose  = require('mongoose');
const app = require('./index')
require('dotenv').config()
// process.env.MONGO_URI+process.env.DB_NAME
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://movie-app-db:movieApp@movie-app-db.a09aeau.mongodb.net/?retryWrites=true&w=majority",{family:4},(err)=>{
          if(!err){
            console.log('Node envirnment : ', process.env.NODE_ENV)
            console.log("database connected successfully DataBaseName : ", process.env.DB_NAME);
            app.listen(process.env.PORT || 5000,()=>{
                console.log('App started at port : ',process.env.PORT || 5000)
            })
          }
})
const mongoose  = require('mongoose');
const app = require('./index')
const mongodbUrl = require('./configs/scretkey')
require('dotenv').config()
// process.env.MONGO_URI+process.env.DB_NAME
mongoose.set('strictQuery', true);
mongoose.connect(mongodbUrl.production_DB_URL,{family:4},(err)=>{
          if(!err){
            console.log('Node envirnment : ', process.env.NODE_ENV)
            console.log("database connected successfully DataBaseName : ", process.env.DB_NAME);
            app.listen(process.env.PORT || 5000,()=>{
                console.log('App started at port : ',process.env.PORT || 5000)
            })
          }
})
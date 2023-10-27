const mongoose=require("mongoose")
require('dotenv').config()
const uri=process.env.DATABASE
const db=mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then((db)=>console.log("database has been connected" .yellow.bold))
.catch((e)=>console.log(e));

module.exports=db
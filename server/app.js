const express=require('express')
const  chats  = require('./data/data')
const colors =require('colors')
const chatRoutes=require('./routers/chatRoutes')
const userRoutes=require('./routers/userRoute')
require('./config/db')
const cors=require('cors')


require('dotenv').config() 
const app=express()
app.use(express.json())
app.use(cors())
const PORT=process.env.PORT
app.get('/',(req,res)=>{
    res.send('hiii')
})
app.use('/api/chat',chatRoutes)


app.use('/api/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`.cyan.bold)
})
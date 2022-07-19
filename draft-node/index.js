const express=require('express');
const router=require('./config/routes')
const app=express()
const cors=require('cors')

const port =3001

const configureDB=require('./config/database')
app.use(cors())
app.use(express.json())
app.use(router)

app.get('/hello',((req,res)=>{
        res.send('Hello')
}))

configureDB()

app.listen(port,()=>{
    console.log(`Server Listening On Port `,port)
})
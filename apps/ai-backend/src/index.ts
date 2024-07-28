import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import { getAnswer } from './lib/gemini'
import bodyParser from 'body-parser'
const app = express()
app.use(cors.apply({
    origin : process.env.FRONTEND_URL,
    methods : ["GET","POST"]
}))
app.use(bodyParser.json())
app.post('/prompt',async(req,res)=>{
    const {prompt} = req.body
    const result = await getAnswer(prompt as string)
    res.send(result)
})
const PORT = 3000 || process.env.PORT
app.listen(PORT,()=>{
    console.log("server is up and running")
})
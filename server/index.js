import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import controller from './controller/index.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: "30mb", entended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", entended: true}))
app.use(cors())

const {PORT} = process.env

app.get('/', controller.upload)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))


    // WWZBkyzklGRxeYyv
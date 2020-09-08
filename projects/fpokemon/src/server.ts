import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import api from '@/core/routes/api'

const PORT = process.env.PORT

const app = express()

app.use('/api', api)

app.listen(PORT)
console.log('Server started', PORT)

import express from 'express'
import {connectDB} from './utils/database.js'

const app = express();
connectDB();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () => {console.log('server started')})


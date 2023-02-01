import express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'

const path = require('path')
const app = express();
dotenv.config();
app.use(express.json({limit: "30mb",extended: true}))
app.use(express.urlencoded({limit: "30mb",extended: true}))
app.use(cors());


app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use ('/user', userRoutes)
app.use ('/questions', questionRoutes)
app.use('/answer', answerRoutes)

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(req,res){
    res.sendFile((path.join(__dirname, './client/build/index.html'));
});

mongoose.set('strictQuery', false);


const PORT = process.env.PORT || https://stackoverflow-clone-api-1y93.onrender.com

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser:true, useUnifiedTopology: true})
 .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
 .catch((err) => console.log(err.message))

import express  from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import { createRequire } from "module";
import * as path from 'path'


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));



import userRoutes from './routes/users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'


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
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

mongoose.set('strictQuery', false);



const PORT = process.env.PORT || 5000

const DATABASE_URL = process.env.CONNECTION_URL

mongoose.connect(DATABASE_URL, { useNewUrlParser:true, useUnifiedTopology: true})
 .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
 .catch((err) => console.log(err.message))

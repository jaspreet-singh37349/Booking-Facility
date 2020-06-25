const express=require('express');
require('./db/database');
const userRouter=require('./router/user');
const facilityRouter=require('./router/facility');
const cors=require('cors');


const app=express();


app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(facilityRouter);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is up at port',port);
})

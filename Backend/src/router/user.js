const express=require('express');
const User=require('../models/user');
const auth=require('../middleware/auth');
const validator=require('validator')
const validate = require('../validation/validd');
const bcrypt=require('bcryptjs');


const router=new express.Router();

router.get('/',(req,res)=>{
    return res.status(400).json("testing");
})

router.post('/user/signup',async (req,res)=>{
    //console.log(req.body)
    const { errors, isValid } = validate(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(async user => {
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        }

        try{
            const user=new User(req.body);
            await user.save();
            const token= await user.generateAuthToken();
            res.status(201).send({Fname:user.Fname,Lname:user.Lname,email:user.email,bookedCars:user.bookedCars,token});
        }catch(e){
            return res.status(400).json(e.toString());
        }
        
    })

    
})
router.post('/user/login',async (req,res)=>{
    try{
        
        const user=await User.findByCredentials(req.body.email,req.body.password);
        const token=await user.generateAuthToken();
        res.send({Fname:user.Fname,Lname:user.Lname,email:user.email,bookedCars:user.bookedCars,token});
    }
    catch(e){
        console.log(e)
        return res.status(400).json({"Error":e});
    }
})
router.post('/user/logout',auth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token;
        })
        await req.user.save();
        res.send();
    }
    catch(e){
        res.status(500).send();
    }

})


module.exports=router;
const express=require('express');
const Facility=require('../models/facility');
const auth=require('../middleware/auth');


const router=new express.Router();


router.post('/book',auth,async (req,res)=>{
    try{

        let facilities = await Facility.find({FacilityType:req.body.FacilityType})

        //console.log(facilities)

        let booked = facilities.filter(facilityy=>new Date(req.body.BookedFrom)>=new Date(facilityy.BookedFrom)&&new Date(req.body.BookedFrom)<new Date(facilityy.BookedTo))

        if(booked.length!==0)
            res.status(201).send("This slot is already booked.Please Select different slot");
        else
        {
            const facility=new Facility({...req.body,user:req.user});
            await facility.save();
            res.status(201).send("Slot Booked");
        }
    }
    catch(e){
        res.status(400).send(e);
    }

})


module.exports=router;
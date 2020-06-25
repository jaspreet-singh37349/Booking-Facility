const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const facilitySchema=new mongoose.Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    FacilityType:{
        type:String,
        required:true
    },
    BookedFrom:{
        type:String,
        required:true
    },
    BookedTo:{
        type:String,
        required:true
    }
});

const Facility=mongoose.model('Facility',facilitySchema);
module.exports=Facility;
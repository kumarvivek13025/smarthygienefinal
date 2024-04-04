const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const devicesSchema=new Schema({
    deviceName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=mongoose.model('Device',devicesSchema);
const mongoose=require('mongoose');

const Schema=mongoose.Schema

const valueSchema=new Schema({
    text:{
        type:String,
        required:true
    }
})

const Value=mongoose.model('Value',valueSchema)

module.exports=Value
const mongoose =require("mongoose")

const userSchema=mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:true
    },
    password:String
})

module.exports = mongoose.model('user',userSchema)
import mongoose from 'mongoose';


const UserSchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    sessionStart:{
        type:Date,
        required:true,
    },
    sessionEnd:{
        type:Date,
        required:true,
    },
    sessionDuration:{
        type:Number,
        required:true,
    },
    channel:{
        type:String,
        enum:['organic','referral','Ads'],
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    revenue:{
        type:Number,
        required:true,    
    }
})

const User =mongoose.models.User || mongoose.model('User',UserSchema);
export default User;
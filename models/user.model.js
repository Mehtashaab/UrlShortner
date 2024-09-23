import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique: true
    },
    redirectUrl:{
        type: String,
        required: true
    },
    visitHistory:[
        {
            timestamp:
            {
                type:Number
            }
        }
    ]
})


const User = mongoose.model('User',userSchema)

export default User;
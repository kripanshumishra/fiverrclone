import { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref:"User"
        }, 
        desc:{
            type:String ,
            required: true ,
        },
        conversatioin:{
            type: Schema.Types.ObjectId,
            ref:"Conversation"
        }
    }, {
        timestamps:true
    }
)

export default mongoose.model ( "Message" , messageSchema )
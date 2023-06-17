import { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        userId : {
            type: Schema.Types.ObjectId,
            ref:"User"
        }, 
        desc:{
            type:String ,
            required: true ,
        },
        conversatioinId :{
            type: Schema.Types.ObjectId,
            ref:"Conversation"
        }
    }, {
        timestamps:true
    }
)

export default mongoose.model ( "Message" , messageSchema )
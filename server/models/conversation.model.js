import { Schema } from "mongoose";
const ConversationSchema = new Schema (
    {
        seller :{
            type : Schema.Types.ObjectId, 
            ref: "User"
        },
        Buyer :{
            type : Schema.Types.ObjectId, 
            ref: "User"
        },
        readBySeller :{
            type : Boolean, 
            required: true,
        },
        readByBuyer :{
            type:Boolean,
            required : true,
        },
        lastMessage :{
            type : String , 
            required: false,
        },
    }, {
        timestamps:true
    }
)

export default mongoose.model( "Conversation" , ConversationSchema ) ;
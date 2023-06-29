const mongoose = require( "mongoose" );
const { Schema } = mongoose;

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
        conversation:{
            type: Schema.Types.ObjectId,
            ref:"Conversation"
        }
    }, {
        timestamps:true
    }
)

module.exports =  mongoose.model ( "Message" , messageSchema )
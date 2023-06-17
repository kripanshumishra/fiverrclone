import { Schema } from "mongoose";
const GigSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        require:true,
        ref : "User"
    },
    title:{
        type:String,
        requried: true ,
    },
    desc:{
        type:String , 
        required: true,
    },
    totalStars:{
        type:Number,
        default:0
    }, 
    starFrequency:{
        type:Number,
        default:0,
    },
    category:{
        type:String , 
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    cover:{
        type:String , 
        required:true
    },
    images:{
        types:[String],
        required:false
    },
    shortTitle:{
        type:String,
        required:true,
    }, 
    shortDesc:{
        type: String , 
        required:true,
    },
    deliveryTime:{
        type:Number, 
        required:true
    },
    revisionNumber:{
        type:Number, 
        required:true
    }, 
    features:{
        type:[String],
        required: false,
    },
    sales:{
        type:Number,
        default:0
    },
},{
    timestamps:true
})

export default mongoose.model( "Gig" , GigSchema )
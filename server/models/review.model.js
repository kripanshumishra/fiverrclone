const ReviewSchema = new Schema ({
    gigId :{
        type : Schema.Types.ObjectId,
        required : true,
        ref:"Gig"
    },
    user:{
        type : Schema.Types.ObjectId , 
        required : true ,
        ref:"User",
    },
    star :{
        type:Number, 
        required : true , 
        enum :[1,2,3,4,5]
    },
    desc :{
        type: String , 
        required: true ,
    }
}, {
    timestamps:true,
});

export default mongoose.model ( "Review" , ReviewSchema );
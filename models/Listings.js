import mongoose from "mongoose";

const ListingSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:4,
        maxlength:20
    },
    description:{
        type:String,
        required:true,
        minlength:5,
        maxlength:500
    },
    price:{
        type:Number,
        required:true,
        min:100,
        max:100000
    },
    location:{
        type:String,
        required:true,
        maxlength:20,
        minlength:3
    },
    country:{
        type:String,
        required:true,
        minlength:2,
        maxlength:10
    },
    image:{
        type:String,
        default:"https://d27s5h82rwvc4v.cloudfront.net/uploads/63e0ae31497191675669041.jpg",
       set:(v)=>v==="" ? "https://d27s5h82rwvc4v.cloudfront.net/uploads/63e0ae31497191675669041.jpg":v,  
    }
})
const listing=mongoose.model("listing",ListingSchema);
export default listing;
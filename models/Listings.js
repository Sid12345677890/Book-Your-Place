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
        default:"https://www.nsnhotels.com/post/top-10-best-hotel-booking-websites-in-india-135",
       set:(v)=>v==="" ? "https://www.nsnhotels.com/post/top-10-best-hotel-booking-websites-in-india-135":v,  
    }
})
const listing=mongoose.model("listing",ListingSchema);
export default listing;
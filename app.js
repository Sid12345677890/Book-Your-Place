import express from "express";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import listing from "./models/Listings.js";
import { fileURLToPath } from "url";
import {Review} from "./models/Reviews.js";
import { reviewSchema } from "./models/Joi.js";
const app=express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
app.listen(3000,()=>{
    console.log("Port connected");
})
async function main(){
   await mongoose.connect("mongodb://127.0.0.1:27017/BookYourRoom");
}
main();

const validateSchema=(req,res,next)=>{
const {error}=reviewSchema.validate(req.body);
if(erorr){
  return res.status(400).send(error.message);
}
next();
}


app.get("/",(req,res)=>{
res.render("home/index.ejs");
})

app.get("/book",async (req,res)=>{
    let data= await listing.find();
    res.render("listings/listings.ejs",{data});
})
app.get("/book/:id",async(req,res)=>{
    let {id}=req.params;
     let data=await listing.findById(id);
     res.render("listings/show.ejs",{data});
})

app.get("/list",(req,res)=>{
   res.render("listings/listform.ejs")
}
)

app.post("/list",async(req,res)=>{
  await listing.create(req.body);
  res.redirect("/book");
}
);
app.post("/book/:id/reviews",validateSchema,async(req,res)=>{
let{id}=req.params;
let listing1=await listing.findById(`${id}`);
console.log(req.body.review);
 let review1=new Review(req.body.review);
 listing1.reviews.push(review1._id);
 await review1.save();
 await listing1.save();
 res.redirect(`/book/${id}`);
})

app.use((req, res, next) => {
  const err = new Error("Page not found");
  err.status =404;
  next(err);
});

app.use((err,req,res,next)=>{ 
    res.status(err.status).send(err.message);
   
})
 
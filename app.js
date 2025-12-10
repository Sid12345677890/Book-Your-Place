import express from "express";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import listing from "./models/Listings.js";
import { fileURLToPath } from "url";
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


 
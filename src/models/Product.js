import mongoose from "mongoose";
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:120},price:{type:Number,required:true,min:0},description:{type:String,required:true,trim:true,maxlength:2000},stockQuantity:{type:Number,required:true,min:0,validate:Number.isInteger}},{timestamps:true});
export default mongoose.model("Product",schema);

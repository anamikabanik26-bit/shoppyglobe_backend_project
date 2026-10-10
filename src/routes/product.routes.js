import {Router} from "express"; import mongoose from "mongoose"; import Product from "../models/Product.js"; import {asyncHandler} from "../middleware/asyncHandler.js";
const router=Router();
router.get("/",asyncHandler(async(_req,res)=>{const products=await Product.find().sort({createdAt:-1});res.json({count:products.length,products});}));
router.get("/:id",asyncHandler(async(req,res)=>{if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({message:"Invalid product ID."}); const product=await Product.findById(req.params.id); if(!product) return res.status(404).json({message:"Product not found."}); res.json({product});}));
export default router;

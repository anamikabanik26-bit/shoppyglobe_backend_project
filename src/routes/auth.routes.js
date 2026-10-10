import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {asyncHandler} from "../middleware/asyncHandler.js";
const router=Router();
function tokenFor(user){if(!process.env.JWT_SECRET) throw Object.assign(new Error("JWT_SECRET is not configured."),{status:500}); return jwt.sign({sub:user._id.toString(),email:user.email},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"1d"});}
router.post("/register",asyncHandler(async(req,res)=>{const {name,email,password}=req.body||{}; if(!name?.trim()||!email?.trim()||!password) return res.status(400).json({message:"name, email and password are required."}); if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({message:"Please provide a valid email address."}); if(password.length<8) return res.status(400).json({message:"Password must be at least 8 characters long."}); const normalized=email.trim().toLowerCase(); if(await User.exists({email:normalized})) return res.status(409).json({message:"An account with this email already exists."}); const passwordHash=await bcrypt.hash(password,12); const user=await User.create({name:name.trim(),email:normalized,passwordHash}); res.status(201).json({message:"Registration successful.",token:tokenFor(user),user:{id:user._id,name:user.name,email:user.email}});}));
router.post("/login",asyncHandler(async(req,res)=>{const {email,password}=req.body||{}; if(!email?.trim()||!password) return res.status(400).json({message:"email and password are required."}); const user=await User.findOne({email:email.trim().toLowerCase()}).select("+passwordHash"); if(!user||!(await bcrypt.compare(password,user.passwordHash))) return res.status(401).json({message:"Invalid email or password."}); res.json({message:"Login successful.",token:tokenFor(user),user:{id:user._id,name:user.name,email:user.email}});}));
export default router;

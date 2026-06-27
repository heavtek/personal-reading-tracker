import { Request,Response } from "express";
import {syncUserProfile} from '../services/authService.js'
import { success } from "zod";

export const register=async(req:Request,res:Response)=>{
const{name,email,password}=req.body
try {
    const result=await syncUserProfile(name,email,password);

res.status(201).json({
    success:true,
        message: "User registered successfully",
    data:result
})
} catch (error:any) {
  return  res.status(400).json({
        success:false,
        message:error.message
        
    });
}




}
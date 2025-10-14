import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";

const auth = (...roles : string[]) => {
   return async (req : Request & {user?:any} , res : Response, next : NextFunction) => {
      try{
          const token =req.cookies.accessToken;
          
          if(!token){
               throw new AppError(StatusCodes.BAD_REQUEST, "You are not authorized!!!");
          }
          
      } catch(err){
          next();
      }
   }
}

export default auth;
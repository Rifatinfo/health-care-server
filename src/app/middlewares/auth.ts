import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { StatusCodes } from "http-status-codes";
import { jwtHelper } from "../helper/jwthelper";

const auth = (...roles : string[]) => {
   return async (req : Request & {user?:any} , res : Response, next : NextFunction) => {
      try{
          const token = req.cookies.accessToken;
          
          if(!token){
               throw new AppError(StatusCodes.BAD_REQUEST, "You are not authorized!!!");
          }
          const verifyUser = jwtHelper.verifyToken(token, "abcd");
          req.user = verifyUser;

          if(roles.length && !roles.includes(verifyUser.role)){
             throw new AppError(StatusCodes.BAD_REQUEST, "You are not authorized");
          }

          next();
          
      } catch(err){
          next(err);
      }
   }
}

export default auth;
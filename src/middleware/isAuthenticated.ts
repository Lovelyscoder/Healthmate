import { Request, Response, NextFunction } from "express";

export const isAuthenticated =( req:Request, res:Response, next:NextFunction ):void =>{
  console.log("middleware is called");
  next();
}

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";

export const validateDto = (dtoClass: any): RequestHandler => async (req, res, next) => {
  const dto = plainToInstance(dtoClass, req.body);
  const errors = await validate(dto);
  if (errors.length > 0) return res.status(400).json({ errors });
  req.body = dto;
  next();
};
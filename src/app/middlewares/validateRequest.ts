import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "./catchAsync";

const validateRequest = (schema: ZodObject) =>
   catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync({
         body: req.body,
         query: req.query,
         params: req.params,
      });
      next();
   });

export default validateRequest;

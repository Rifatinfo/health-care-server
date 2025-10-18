import { UserRole } from "@prisma/client";
import { Request } from "express";

export type IJwtPayload = {
    email : string;
    role : UserRole
}

export interface AuthenticatedRequest extends Request {
  user? : IJwtPayload
}
import { Request } from "express";
import { UserInstance } from '../database/models/user';

export interface ReqProps extends Request {
    user: UserInstance
}
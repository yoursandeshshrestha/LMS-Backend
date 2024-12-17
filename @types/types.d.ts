import { IUser } from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add your IUser interface here
    }
  }
}

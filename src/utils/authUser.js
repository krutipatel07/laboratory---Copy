import dbConnect from "./dbConnect";
import { getToken } from "next-auth/jwt";
import { User } from "../models";

dbConnect();

async function authenticatedUser(req) {
  const token = await getToken({req, raw: true});
  if (token) {
    const jsonObject = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return await User.findOne({email: jsonObject.email});
  }
}

export default authenticatedUser
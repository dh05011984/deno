import { Status } from "../deps.ts";
import client from "../config/databases.ts";
import hash from "../util/hash.ts";
import User from "../models/User.ts";

export default {
  async getAllUsers(ctx: any) {
    ctx.response.status = Status.OK;
    let user: User;
    user = await client.query("select * from users");
    console.log("User", user);
    ctx.response.body = user;
  },
};

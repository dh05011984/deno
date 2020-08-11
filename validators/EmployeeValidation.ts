import { Status } from "../deps.ts";
export default {
  async validate(ctx: any) {
    // const { value } = await ctx.request.body();
    const value  = await (ctx.request.body()).value;
    // console.log("inVal", value);
    if (!ctx.request.hasBody) {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { error: "Please provide the data" };
      return;
    }
    if (!value) {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { error: "Please provide the data" };
      return;
    }
    if (!value.name) {
      ctx.response.status = 422; // unprocessible request
      ctx.response.body = { error: { message: "Name field is required!" } };
      return;
    }
    if (!value.email) {
      ctx.response.status = 422; // unprocessible request
      ctx.response.body = { error: { message: "Email field is required!" } };
      return;
    }
    if (!value.mobile) {
      ctx.response.status = 422; // unprocessible request
      ctx.response.body = { error: { message: "Mobile field is required!" } };
      return;
    }
    if (!value.password) {
      ctx.response.status = 422; // unprocessible request
      ctx.response.body = { error: { message: "Password field is required!" } };
      return;
    }
    return value;
  },
  async validateLogin(ctx: any) {
    let errors = [];
    let status;
    const value  = await (ctx.request.body()).value;
    // const result = await ctx.request.body();
    // const {value} =  result;
    if (value == undefined || !value) {
      console.log("jjj");
      ctx.response.status = 400;
      ctx.response.body = { error: "Please provide the required data." };
      return undefined;
    }

    const fields = ["email", "password"];
    for (let index = 0; index < fields.length; index++) {
      if (!value[fields[index]]) {
        status = 422;
        errors.push({ [fields[index]]: `${fields[index]} field is required` });
      }
    }

    if (status) {
      ctx.response.status = status;
      ctx.response.body = { errors };
      return false;
    }

    return value;
  },
};

import token from "../util/token.ts";

export default {
  async authorized(ctx: any, next: any) {
    const authorization = ctx.request.headers.get("authorization");
    if (!authorization) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }
    const headerToken = authorization.replace("Bearer ", "");
    const isValidToken = await token.validate(headerToken);
    // console.log(isValidToken);
    // Validate Token
    if (!isValidToken) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Unauthorized" };
      return;
    }
    await next();
    // ctx.response.body = "success!!!!!!";
  },
};

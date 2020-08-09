import { validateJwt, config } from "../deps.ts";
import { makeJwt, setExpiration, Jose, Payload } from "../deps.ts";

const key = "your-secret";
// const payload: Payload = {
//   iss: "dhananjay",
//   exp: setExpiration(new Date().getTime() + 60000),
// };
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  generate(userId: string): string {
    const payload: Payload = {
      iss: userId,
      exp: setExpiration(new Date().getTime() + 60000),
    };
    return makeJwt({ header, payload, key });
  },
  async validate(token: string) {
    return await validateJwt(token, key, { isThrowing: false });
  },
};

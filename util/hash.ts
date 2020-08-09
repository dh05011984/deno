import { bcrypt } from "../deps.ts";

export default {
  async bcrypt(stringToHash: string) {
    const hash = await bcrypt.hash(stringToHash);
    return hash;
  },

  async verify(value: string, hashedValue: string) {
    const result = await bcrypt.compare(value, hashedValue);
    return result;
  },
};

import client from "../config/databases.ts";
import { Status, RouterContext } from "../deps.ts";
import EmployeeValidation from "../validators/EmployeeValidation.ts";
import hash from "../util/hash.ts";
import EmployeeController from "./EmployeeController.ts";
import employeeHelper from "../businesshelper/EmployeeHelper.ts";
import token from "../util/token.ts";

export default {
  async Login(ctx: any) {
    const value = await EmployeeValidation.validateLogin(ctx);
    if (value == undefined || value == false) {
      return;
    }

    const employee = await employeeHelper.getEmployeByEmail(value.email);
    if (!employee) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Employee does't match out record." };
      return;
    }
    const passwordMatched = await hash.verify(
      value.password,
      employee.Password
    );
    if (!passwordMatched) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Password does't match." };
      return;
    }
    // ctx.response.body = employee; // rather this we can return JWT token
    let jwt = token.generate(value.email);
    // ctx.response.body = token.generate();
    ctx.response.status = 200;
    ctx.response.body = {
      id: employee.Id,
      name: employee.Name,
      email: employee.Email,
      mobile: employee.Mobile,
      jwt,
    };
  },
};

import { Status } from "../deps.ts";
import hash from "../util/hash.ts";
import Employee from "../models/Employee.ts";
import employeeHelper from "../businesshelper/EmployeeHelper.ts";
import EmployeeValidation from "../validators/EmployeeValidation.ts";

export default {
  async getAllEmployees(ctx:any) {
    let employee: Employee;
    employee = await employeeHelper.getAllEmployees();
    ctx.response.status = Status.OK;
    ctx.response.body = employee;   
  },

  async getEmployeeById(ctx: any) {
    let employee: Employee;
    employee = await employeeHelper.getEmployeeById(
      parseInt(ctx.params.id || "0")
    );
    ctx.response.status = Status.OK;
    ctx.response.body = employee;
  },
  async createEmployee(ctx: any) {
    const value = await EmployeeValidation.validate(ctx);
    // console.log(value);
    if (!value) {
      return;
    }
    // hash password
    value.password = await hash.bcrypt(value.password);
    try {
      let result = await employeeHelper.createEmployee(value);
      ctx.response.status = 201;
      ctx.response.body = result;
    } catch (error) {
      ctx.response.status = Status.Conflict; //409 Conflict
      ctx.response.body = { error: error.message };
    }
  },
  updateEmployee(ctx: any) {
    ctx.response.status = 200;
    // const body = await ctx.request.body();
    ctx.response.body = "Updated " + ctx.params.id;
  },
  async deleteEmployee(ctx: any) {
    let employee = await employeeHelper.getEmployeeById(
      parseInt(ctx.params.id || "0")
    );
    if (!employee) {
      ctx.response.status = 422;
      ctx.response.body = { error: "Employee not found with this Id" };
      return;
    }
    const result = await employeeHelper.deleteEmployee(
      parseInt(ctx.params.id || "0")
    );
    if (result.affectedRows || 0 > 0) {
      ctx.response.status = 202;
      ctx.response.body = result;
    } else {
      ctx.response.status = 404;
      ctx.response.body = { error: "Employee not found" };
    }
  },
};

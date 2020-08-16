import { Status } from "../deps.ts";
import client from "../config/databases.ts";
import hash from "../util/hash.ts";
import EmpPersonalDetail from "../models/EmpPersonalDetail.ts";

export default {
  async getAllEmpPersonalDetail(ctx: any) {
    let employee: EmpPersonalDetail;
    employee = await client.query("select * from EmpPersonalDetail");
    console.log("Employee", employee);

    ctx.response.status = Status.OK;
    ctx.response.body = employee;
  },

  async getEmployeeById(ctx: any) {
    let employee: EmpPersonalDetail;
    employee = await client.query("select ?? from ?? where id =?", [
      "*",
      "EmpPersonalDetail",
      ctx.params.id,
    ]);
    console.log("dhananjayid", ctx.params.id);
    // let value: string = "dhananjay";
    // const isValid = await hash.verify(value, user[0].password);
    // if (isValid == true) {
    //     user[0].password = value;
    //     console.log('valid user');
    // }
    ctx.response.status = Status.OK;
    ctx.response.body = employee;
  },
  async createEmployee(ctx: any) {
    if (!ctx.request.hasBody) {
      ctx.response.status = 400; // Bad Request
      ctx.response.body = { error: "Please provide the data" };
      return;
    }
    // const { value } = await ctx.request.body();
    const value = await (ctx.request.body()).value;
    console.log('value', value.empId);
    let result = await client.execute(
      `INSERT INTO EmpPersonalDetail(EmpId,FirstName,MidName,LastName,DOB,Gender,BloodGroup,Citizenship,MaritalStatus ,Passport ,Aadhar ,UAN,PAN,SSN ,DrivingLicense ,MarriageDate,Created_by) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        value.empId,
        value.firstName,
        value.midName,
        value.lastName,
        value.dob,
        value.gender,
        value.bloodGroup,
        value.citizenship,
        value.maritalStatus,
        value.passport,
        value.aadhar,
        value.uan,
        value.pan,
        value.ssn,
        value.drivingLicense,
        value.marriageDate,
        value.created_by,
      ]
    );
    ctx.response.status = 201;
    ctx.response.body = result;
  },
  updateEmployee(ctx: any) {
    ctx.response.status = 200;
    // const body = await ctx.request.body();
    ctx.response.body = "Updated " + ctx.params.id;
  },
  async deleteEmployee(ctx: any) {
    //   let employee = await getEmployeeById(ctx.params.id);
    const result = await client.execute(
      "DELETE FROM EmpPersonalDetail WHERE id=?",
      [ctx.params.id]
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

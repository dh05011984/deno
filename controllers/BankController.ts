import { Status } from "../deps.ts";
import client from "../config/databases.ts";
import Bank from "../models/Bank.ts";

export default {
    async getAllBank(ctx: any) {
        let employee: Bank;
        employee = await client.query("select * from Bank");
        ctx.response.status = Status.OK;
        ctx.response.body = employee;
    },

    async getBankById(ctx: any) {
        let employee: Bank;
        employee = await client.query("select ?? from ?? where id =?", [
            "*",
            "Bank",
            ctx.params.id,
        ]);
        console.log("dhananjayid", ctx.params.id);
        ctx.response.status = Status.OK;
        ctx.response.body = employee;
    },
    async createBank(ctx: any) {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400; // Bad Request
            ctx.response.body = { error: "Please provide the data" };
            return;
        }
        // const { value } = await ctx.request.body();
        const value = await (ctx.request.body()).value;
        console.log(value);
        let result = await client.execute(
            `INSERT INTO Bank(EmpId,Name,Ifsc,Branch,Account) values(?,?,?,?,?)`,
            [
                value.empId,
                value.name,
                value.ifsc,
                value.branch,
                value.account
            ]
        );
        ctx.response.status = 201;
        ctx.response.body = result;
    },
    updateBank(ctx: any) {
        ctx.response.status = 200;
        // const body = await ctx.request.body();
        ctx.response.body = "Updated " + ctx.params.id;
    },
    async deleteBank(ctx: any) {
        //   let employee = await getEmployeeById(ctx.params.id);
        const result = await client.execute(
            "DELETE FROM Bank WHERE id=?",
            [ctx.params.id]
        );
        if (result.affectedRows || 0 > 0) {
            ctx.response.status = 202;
            ctx.response.body = result;
        } else {
            ctx.response.status = 404;
            ctx.response.body = { error: "Bank not found" };
        }
    },
}
import { Status } from "../deps.ts";
import client from "../config/databases.ts";
import EmpSkill from "../models/EmpSkills.ts";

export default {
    async getAllEmpSkill(ctx: any) {
        let employee: EmpSkill;
        employee = await client.query("select * from EmpSkill");
        ctx.response.status = Status.OK;
        ctx.response.body = employee;
    },

    async getSkillById(ctx: any) {
        let employee: EmpSkill;
        employee = await client.query("select ?? from ?? where id =?", [
            "*",
            "EmpSkill",
            ctx.params.id,
        ]);
        console.log("dhananjayid", ctx.params.id);
        ctx.response.status = Status.OK;
        ctx.response.body = employee;
    },
    async createSkill(ctx: any) {
        if (!ctx.request.hasBody) {
            ctx.response.status = 400; // Bad Request
            ctx.response.body = { error: "Please provide the data" };
            return;
        }
        // const { value } = await ctx.request.body();
        const value = await (ctx.request.body()).value;
        let result = await client.execute(
            `INSERT INTO EmpSkill(EmpId,Skill,Rating) values(?,?,?)`,
            [
                value.empId,
                value.skill,
                value.rating
            ]
        );
        ctx.response.status = 201;
        ctx.response.body = result;
    },
    updateSkill(ctx: any) {
        ctx.response.status = 200;
        // const body = await ctx.request.body();
        ctx.response.body = "Updated " + ctx.params.id;
    },
    async deleteSkill(ctx: any) {
        //   let employee = await getEmployeeById(ctx.params.id);
        const result = await client.execute(
            "DELETE FROM EmpSkill WHERE id=?",
            [ctx.params.id]
        );
        if (result.affectedRows || 0 > 0) {
            ctx.response.status = 202;
            ctx.response.body = result;
        } else {
            ctx.response.status = 404;
            ctx.response.body = { error: "Skill not found" };
        }
    },
}
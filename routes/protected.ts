import { Router, RouterContext, config, oakCors } from "../deps.ts";
import empPersonalDetailController from "../controllers/EmpPersonalDetailController.ts";
const protectedRouter = new Router()
const env = config();
const app_version = env.APP_VERSION || '/';

// Employee Personal Details
protectedRouter
  .get(`${app_version}emppersonal`, empPersonalDetailController.getAllEmpPersonalDetail)
  .get(`${app_version}emppersonal/:id`, empPersonalDetailController.getEmployeeById)
  .post(`${app_version}emppersonal`, empPersonalDetailController.createEmployee)
  .delete(`${app_version}emppersonal/:id`, empPersonalDetailController.deleteEmployee);


export default protectedRouter;

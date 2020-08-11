import { Router, config } from "../deps.ts";
import employeeController from "../controllers/EmployeeController.ts";
import authController from "../controllers/AuthController.ts";

const router = new Router();
const env = config();
const app_version = env.APP_VERSION || "/";
router.get(`${app_version}`, (ctx: any) => {
  console.log((ctx.response.body = "dhananjay"));
});

router
  .get(`${app_version}employee`, employeeController.getAllEmployees)
  .get(`${app_version}employee/:id`, employeeController.getEmployeeById)
  .post(`${app_version}employee`, employeeController.createEmployee)
  .delete(`${app_version}employee/:id`, employeeController.deleteEmployee);

router.post(`${app_version}login`, authController.Login);



export default router;

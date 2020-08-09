import { Router, RouterContext, config } from "../deps.ts";
import userController from "../controllers/UserController.ts";
import employeeController from "../controllers/EmployeeController.ts";
import authController from "../controllers/AuthController.ts";

const router = new Router();
const env = config();
const app_version = env.APP_VERSION || "/";
router.get(`${app_version}`, (ctx: RouterContext) => {
  console.log((ctx.response.body = "dhananjay"));
});

router.get(`${app_version}user`, userController.getAllUsers);

router
  .get(`${app_version}employee`,prefunc, employeeController.getAllEmployees)
  .get(`${app_version}employee/:id`, employeeController.getEmployeeById)
  .post(`${app_version}employee`, employeeController.createEmployee)
  .delete(`${app_version}employee/:id`, employeeController.deleteEmployee);

router.post(`${app_version}login`, authController.Login);

async function prefunc(next:any)
{
  console.log(121212);
  next();
}

export default router;

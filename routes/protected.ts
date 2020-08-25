import { Router, RouterContext, config, oakCors } from "../deps.ts";
import empPersonalDetailController from "../controllers/EmpPersonalDetailController.ts";
import empSkillController from '../controllers/EmpSkillController.ts';
import bankController from '../controllers/BankController.ts';
const protectedRouter = new Router()
const env = config();
const app_version = env.APP_VERSION || '/';

// Employee Personal Details
protectedRouter
  .get(`${app_version}emppersonal`, empPersonalDetailController.getAllEmpPersonalDetail)
  .get(`${app_version}emppersonal/:id`, empPersonalDetailController.getEmployeeById)
  .post(`${app_version}emppersonal`, empPersonalDetailController.createEmployee)
  .delete(`${app_version}emppersonal/:id`, empPersonalDetailController.deleteEmployee);

// Employee Skill Details
protectedRouter
  .get(`${app_version}empskill`, empSkillController.getAllEmpSkill)
  .get(`${app_version}empskill/:id`, empSkillController.getSkillById)
  .post(`${app_version}empskill`, empSkillController.createSkill)
  .delete(`${app_version}empskill/:id`, empSkillController.deleteSkill);


// Bannk Details
protectedRouter
  .get(`${app_version}empbank`, bankController.getAllBank)
  .get(`${app_version}empbank/:id`, bankController.getBankById)
  .post(`${app_version}empbank`, bankController.createBank)
  .delete(`${app_version}empbank/:id`, bankController.deleteBank);

export default protectedRouter;

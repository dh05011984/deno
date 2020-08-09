import client from "../config/databases.ts";
import Employee from "../models/Employee.ts";

class EmployeeHelper {
  async getAllEmployees() {
    let employee: Employee;
    employee = await client.query("select * from employee");
    // return employee.map((emp:any)=>)
    return employee;
  }
  async getEmployeeById(empId: number): Promise<Employee> {
    // let employee: Employee = Object.create(null);
    let employee = await client.query("select ?? from ?? where id =?", [
      "*",
      "employee",
      empId,
    ]);
    return employee[0];
  }
  async getEmployeByEmail(email: string) {
    const employee = await client.query("select ?? from ?? where email =?", [
      "*",
      "employee",
      email,
    ]);
    return employee[0];
  }
  async createEmployee(value: any) {
    let result = await client.execute(
      `INSERT INTO employee(name,email,mobile,password) values(?,?,?,?)`,
      [value.name, value.email, value.mobile, value.password]
    );
    return result;
  }

  async deleteEmployee(empId: number) {
    const result = await client.execute("DELETE FROM employee WHERE id=?", [
      empId,
    ]);
    return result;
  }
}
const employeeHelper = new EmployeeHelper();
export default employeeHelper;

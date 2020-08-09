// export default class Employee {
//   constructor(
//     public id: number,
//     public code: string,
//     public name: string,
//     public email: string,
//     public mobile: string,
//     public password: string,
//     public created_at: string
//   ) {}
// }
export default interface Employee {
  id: number;
  code: string;
  name: string;
  email: string;
  mobile: string;
  password: string;
  created_at: string;
}

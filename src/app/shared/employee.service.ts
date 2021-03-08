import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  // @ts-ignore
  selectedEmployee: Employee ;
  // @ts-ignore
  employees: Employee[];
  readonly baseURL = 'http://localhost:3000/employees';


  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  // tslint:disable-next-line:typedef
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  // tslint:disable-next-line:typedef
  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  // tslint:disable-next-line:typedef variable-name
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';
declare var M: any;
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

  // tslint:disable-next-line:typedef
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    // @ts-ignore
    // @ts-ignore
    this.employeeService.selectedEmployee = {
      _id: '',
      name: '',
      position: '',
      office: '',
      // @ts-ignore
      salary: null
    };
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    if (form.value._id === '') {
      this.employeeService.postEmployee(form.value).subscribe(() => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe(() => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  // tslint:disable-next-line:typedef
  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res: any) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  // tslint:disable-next-line:typedef
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }

  // tslint:disable-next-line:typedef variable-name
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?')) {
      this.employeeService.deleteEmployee(_id).subscribe(() => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}

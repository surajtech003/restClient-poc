import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared_service/employee.service';
import { Employee } from '../../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listemployee',
  templateUrl: './listemployee.component.html',
  styleUrls: ['./listemployee.component.css']
})
export class ListemployeeComponent implements OnInit {
  private employees:Employee[];
  constructor(private _employeeService:EmployeeService, private _router:Router) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe((employees)=>{
        console.log(employees);
        this.employees = employees;
    },(error)=>{
      console.log(error);
    })
  }

  deleteEmployee(employee:Employee) {
    this._employeeService.deleteEmployee(employee.employeeId).subscribe((employees)=>{
      this.employees.splice(this.employees.indexOf(employee),1);
    },(error)=>{
      console.log(error);
    });
  }

  updateEmployee(employee:Employee) {
    this._employeeService.setter(employee);
    this._router.navigate(['/op']);
  }

  newEmployee() {
    let employee = new Employee();
    this._employeeService.setter(employee);
    this._router.navigate(['/op']);
  }

}

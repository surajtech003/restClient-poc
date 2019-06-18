import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeService } from '../../shared_service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  private  employee:Employee;

  constructor(private _employeeService:EmployeeService, private _router:Router) { }

  ngOnInit() {
    this.employee = this._employeeService.getter();
  }

  processForm() {
    if(this.employee.employeeId==undefined) {
      this._employeeService.createEmployee(this.employee).subscribe((employee)=>{
        console.log(employee);
        this._router.navigate(['/']);
      }, (error)=>{
        console.log(error);
      });
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe((employee)=>{
        console.log(employee);
        this._router.navigate(['/']);
      }, (error)=>{
        console.log(error);
      });
    }
  }

}

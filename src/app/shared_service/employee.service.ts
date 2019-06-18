import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, throwError } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl:string="http://localhost:8081/api";
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  private employee:Employee;
  constructor(private _http:Http) { }

  getEmployees() {
    return this._http.get(this.baseUrl+'/getAll',this.options).pipe(map((response: any) => response.json()))
     .pipe(catchError(this.errorHandler));
  }

  getEmployee(id:Number) {
    return this._http.get(this.baseUrl+'/get/'+id,this.options).pipe(map((response: any) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id:Number) {
    return this._http.delete(this.baseUrl+'/delete/'+id,this.options).pipe(map((response: any) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  createEmployee(employee:Employee) {
    return this._http.post(this.baseUrl+'/create', JSON.stringify(employee), this.options).pipe(map((response: any) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  updateEmployee(employee:Employee) {
    return this._http.put(this.baseUrl+'/update', JSON.stringify(employee), this.options).pipe(map((response: any) => response.json()))
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:Response) {
      return throwError(error||"SERVER ERROR");
  }

  setter(employee:Employee) {
    this.employee = employee;
  }

  getter() {
    return this.employee;
  }

}

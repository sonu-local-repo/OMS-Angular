import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL_DOMAIN} from "../shared/global";
import {Observable} from "rxjs";
import {Employee} from "../model/employee.model";


@Injectable({
  providedIn:'root'
})

export class EmployeeService {
  constructor(private http: HttpClient) { }

  fetchAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${API_URL_DOMAIN}/org/employee/all`);
  }

}

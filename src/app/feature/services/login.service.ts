import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserCredentials} from "../model/credentials";
import {Observable} from "rxjs";
import {AuthAPI} from "../shared/api-endpoints/login";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(userCredentials: UserCredentials):Observable<any>{
    return this.http.post<any>(AuthAPI.loginUsers(),userCredentials, { reportProgress: true });
  }

}

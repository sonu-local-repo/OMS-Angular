import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserCredentials} from "../model/credentials";
import {Observable} from "rxjs";
import {AuthAPI} from "../shared/api-endpoints/login";
import {OPTY_API} from "../shared/api-endpoints/opportunity";
import {ApiResponse} from "../model/api-response";
import {Opportunity} from "../model/opportunity-model";
import {SearchParam} from "../model/search-param";


@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(private http: HttpClient) { }

  fetchAllOpportunityByPage(searchParams: SearchParam):Observable<ApiResponse<Opportunity[]>>{
    return this.http.get<ApiResponse<Opportunity[]>>(OPTY_API.fetchAllOpportunityByPage(searchParams));
  }
  fetchOpportunityById(id:number):Observable<Opportunity>{
    return this.http.get<Opportunity>(OPTY_API.fetchOpportunityByIdUrl(id))
  }
}

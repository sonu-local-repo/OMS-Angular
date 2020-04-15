import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SCHEDULER_API} from "../shared/api-endpoints/scheduler";
import {Observable} from "rxjs";
import {ScheduleEvent} from "../model/scheduleevent";
import {API_URL_DOMAIN} from "../shared/global";
import {ScheduleModel} from "../model/schedule.model";

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  constructor(private http: HttpClient) {}

  getAllSchedules():Observable<ScheduleEvent[]> {
    return this.http.get<ScheduleEvent[]>(SCHEDULER_API.fetchAllSchedulesUrl());
  }
  getScheduleByAssignee() {}
  getScheduleByOpportunity(id: number): Observable<ScheduleModel[]> {
    return this.http.get<ScheduleModel[]>(`${API_URL_DOMAIN}/omt/scheduler/opty/${id}`);
  }
  getScheduleByQuote() {}
  createSchedule(body: ScheduleEvent):Observable<ScheduleEvent> {
    // return this.apiService.post('scheduler/create', body);
    return this.http.post<ScheduleEvent>(SCHEDULER_API.createSchedule(), body);
  }
}

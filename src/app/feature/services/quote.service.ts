import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {QuoteLineItem} from "../model/quote-line-model";
import {HttpClient} from "@angular/common/http";
import {QUOTE_API} from "../shared/api-endpoints/quote";
import {ApiResponse} from "../model/api-response";
import {API_URL_DOMAIN} from "../shared/global";


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) {
  }

  fetchQuoteByOptyId(opportunityId: number): Observable<QuoteLineItem[]>{

    return this.http.get<QuoteLineItem[]>(QUOTE_API.fetchQuoteLineUrl(opportunityId));
  }

  updateQuoteLineWithScheduleId(id: number, scheduleId: number):Observable<QuoteLineItem>{
    return this.http.put<QuoteLineItem>(`${API_URL_DOMAIN}/omt/quoteLine/schedule/${id}`, scheduleId);
  }
}

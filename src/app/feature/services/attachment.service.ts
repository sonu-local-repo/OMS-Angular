import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_ATTACHMENT} from "../shared/api-endpoints/attachment";
import {AttachmentModel} from "../model/attachment.model";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api-response";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService{
  constructor(private http: HttpClient) {
  }

  uploadAttachments(file: any, id: number){

        return this.http.post(API_ATTACHMENT.uploadAttachmentUrl(id), file);
  }
  fetchAttachmentByParentId(parentId: number):Observable<AttachmentModel[]>{
    return this.http.get<AttachmentModel[]>(API_ATTACHMENT.fetchAllAttachmentByParentIdUrl(parentId));
  }
  viewAttachmentById(id: number){

    const url = API_ATTACHMENT.viewAttachmentById(id);
    const httpOptions = {
      // 'responseType'  : 'arraybuffer' as 'json'
      responseType: 'blob' as 'json'        //This also worked
    };

    return this.http.get<any>(url, httpOptions);

  }

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }
}

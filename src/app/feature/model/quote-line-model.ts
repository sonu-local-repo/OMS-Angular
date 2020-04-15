import {ScheduleEvent} from "./scheduleevent";

export class QuoteLineItem {
  'orgId': number;
  'id': number;
  'type': string;
  'status': string;
  'source': string;
  'description': string;
  'optyId': number;
  'quoteId': number;
  'accountId': number;
  'owner': number;
  'dueDate': string;

  'createdAt': string;
  'updatedAt': string;
  'createdBy': string;
  'updatedBy': number;
  "scheduler": ScheduleEvent;
}

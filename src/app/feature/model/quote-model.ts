import {QuoteLineItem} from "./quote-line-model";


export class Quote {
  'orgId': number;
  'id': number;
  'optyId': number;
  'accountId': number;
  'rate': number;
  'quoteLine': QuoteLineItem[];

  'createdAt': string;
  'updatedAt': string;
  'createdBy': string;
  'updatedBy': string;
}

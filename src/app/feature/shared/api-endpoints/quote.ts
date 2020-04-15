import {API_URL_DOMAIN} from "../global";

export const QUOTE_API = {
  fetchQuoteLineUrl(id: number){
    return `${API_URL_DOMAIN}/omt/quoteLine/opty/${id}`;
  },
  updateQuoteLineWithScheduleId(id: number){
    return `${API_URL_DOMAIN}/omt/quoteLine/schedule/${id}`;
  }
}

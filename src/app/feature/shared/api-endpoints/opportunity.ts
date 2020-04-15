import {API_URL_DOMAIN} from "../global";
import {SearchParam} from "../../model/search-param";


export const OPTY_API = {

  fetchAllOpportunityByPage(params: SearchParam){
    return `${API_URL_DOMAIN}/omt/opty/page?searchString=${params.searchString}`
      + `&page=${params.page}&size=${params.size}&sort=${params.sortBy}&direction=${params.sortDirection}`;
  },
  fetchOpportunityByIdUrl(id: number){
    return `${API_URL_DOMAIN}/omt/opty/${id}`;
  }
}

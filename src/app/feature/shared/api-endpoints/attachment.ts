import {API_URL_DOMAIN} from "../global";

export const API_ATTACHMENT = {
  uploadAttachmentUrl(id: number){
    return `${API_URL_DOMAIN}/omt/opty/${id}/attachment`;
  },
  fetchAllAttachmentByParentIdUrl(id:number){
    return `${API_URL_DOMAIN}/oms/attachment/parent/${id}`;
  },
  viewAttachmentById(id: number){
    return `${API_URL_DOMAIN}/oms/attachment/${id}`;
  }
}

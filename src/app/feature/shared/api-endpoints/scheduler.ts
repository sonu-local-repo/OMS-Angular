import {API_URL_DOMAIN} from "../global";
import {ScheduleEvent} from "../../model/scheduleevent";

export const SCHEDULER_API = {

  fetchAllSchedulesUrl(){
    return `${API_URL_DOMAIN}/omt/scheduler/all`;
  },
  createSchedule(){
    return `${API_URL_DOMAIN}/omt/scheduler/create`;
  }

}

import { API_URL_DOMAIN } from '../global'


export const AuthAPI = {
  loginUsers(){
    return `${API_URL_DOMAIN}/authenticate`;
  }

}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ContactService{
  constructor(private http: HttpClient) { }

  addressModification(contacts:any){

    contacts.map(contact=>{
      if(contact.addresses.length > 0){
        const address = contact.addresses[0];
        contact.addressValue = address.address1+','+address.address2+','+address.city+','+address.state;
      }
    })


    return contacts;
  }
}

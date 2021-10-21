import { Injectable } from '@angular/core';
import { IMail } from '@core/interfaces/mail.interface';
import { SEND_EMAIL_ACTION } from '@graphql/operations/mutations/mail';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {ApiService} from '../../@graphql/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class MailService extends ApiService {

  constructor(apollo: Apollo) {
    super(apollo);
   }
   send(mail: IMail){
     return this.set(
      SEND_EMAIL_ACTION, {
        mail
      }
     ).pipe(map((result: any) => {
         return result.sendEmail;
     }));
   }
}

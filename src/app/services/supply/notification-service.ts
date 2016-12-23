import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { NotificationModel } from "../../models/notification.model";
import { ApiService } from './api-service';

/*
  Generated class for the NotificationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificationService extends ApiService<NotificationModel, number> {

  

  constructor(http: Http) {
    // TODO get - set url
    super(http, 'supply/notifications');

  }


  getNotifications():  Promise<NotificationModel[]> {
     return this.getMany();
  }

  getNotification(id: number):  Promise<NotificationModel> {
    return this.getOne(id);
  }

  deleteNotification(id: number): Promise<void> {
    return this.delete(id);
  }

}

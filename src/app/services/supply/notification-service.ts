import { Injectable } from '@angular/core';

import { NotificationModel } from "../../models/notification.model";
import { LoggerService } from "../logger/logger-service";
import { InMemoryDataService } from './in-memory-data-service';

/*
  Generated class for the LoggerService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificationService extends InMemoryDataService<NotificationModel, number> {

  constructor(private log: LoggerService) {
    super();
    this.createData();
  }

  private createData() {
    this.data = [
      { id: 1, message: 'You have 1 pending inventory', title: 'Inventory', noticeType: 1 },
      { id: 2, message: 'You have 4 active due ins', title: 'Active Due Ins', noticeType: 1 },
      { id: 3, message: 'You have 3 orders pending submission', title: 'Working Orders', noticeType: 1 }
    ];
  }

  getNotifications(): Promise<NotificationModel[]> {
    return this.getMany();
  }

  getNotification(id: number): Promise<NotificationModel> {
    return this.getOne(id);
  }

  deleteNotification(id: number) {
    return this.delete(id);
  }

}

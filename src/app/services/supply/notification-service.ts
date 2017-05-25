import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { NotificationModel } from "../../models/notification.model";
import { LoggerService } from "../logger/logger-service";
import { BaseDatabaseService } from '../../services/base-database.service';
import { DatabaseTableModelService } from '../database-table-model.service';

@Injectable()
export class NotificationService extends BaseDatabaseService<NotificationModel> {
   // Demo data file location
  assetFilename: string = "supply-notifications.json";
  assetDirectory: string = "assets/files";

  constructor(
     databaseService: DatabaseTableModelService,
     private http: Http,
    log: LoggerService) {
      // TODO store in db ? inject table : null
    super('Supply Notification Service', null, log);

  }

  getNotifications() {
    let url: string = this.assetDirectory + '/' + this.assetFilename;
    return this.http.get(url);
  }

  // getNotification(id: number)  {
  //   return this.get(id);
  // }

  // deleteNotification(id: number) {
  //   // TODO FIX this
  //   //return this.delete(id);
  // }

}

import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NotificationModel } from '../../../models/notification.model';

import { NotificationService } from "../../../services/supply/notification-service";


@Component({
  selector: 'notifications-notifications',
  templateUrl: './notifications.component.html'
})

export class NotificationsComponent {

  notifications = new Array<NotificationModel>();

  constructor(public navController: NavController, public notificationService: NotificationService) {     

  }

  ionViewWillEnter() {
     this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotifications().then(n => this.notifications = n);
  }

  notificationSelected(event, notice) {
    // todo something with the notification - go to, go there, see details...?
  }

  notificationSwiped(event, notice) {
    this.notificationService.delete(notice.id);
    this.getNotifications();   
  }

  addNotification(notice) {
    //this.notificationService.addNotification(notice);
  }


}

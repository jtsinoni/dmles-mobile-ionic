import { Component } from '@angular/core';

import { NavController, NavParams, ActionSheetController, Platform, ModalController } from 'ionic-angular';

import { OrderModel } from '../../../models/order.model';

import { OrderDetailComponent } from './order-detail/order-detail.component';

import { OrderService } from "../../../services/supply/order-service";
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
  selector: 'page-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {

  public ordersList: Array<OrderModel>;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    public orderService: OrderService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    public log: LoggerService) {

  }

  ionViewWillEnter() {
    this.getOrders();

  }

  getOrders() {
    this.orderService.getAllOrders().then(orders => this.ordersList = orders);

  }

  orderSelected(order) {

    let options = this.actionSheetController.create({
      buttons: [
        {
          text: 'Get Status',
          role: 'status',
          handler: () => {
            //todo update Status
          }
        },
        {
          text: 'Receive',
          role: 'receipt',
          handler: () => {
            //todo process receipt
          }
        },
         {
          text: 'Detail',
          role: 'all',
          handler: () => {
            if (order) {
              this.presentDetailModal(order);
            }
          }
        },
        {
          text: 'Close',
          role: 'close',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.log.info('Close clicked');
          }
        }
      ]
    });
    options.present();

  }

  presentDetailModal(order: OrderModel) {
    let detailModal = this.modalController.create(OrderDetailComponent, { orderItem: order});
    detailModal.present();
  }

}

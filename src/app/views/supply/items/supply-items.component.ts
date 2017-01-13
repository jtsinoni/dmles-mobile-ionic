import { Component } from '@angular/core';

import { NavController, NavParams, AlertController, ModalController, ActionSheetController, Platform } from 'ionic-angular';

import { SupplyItemModel } from '../../../models/supply-item.model';

import { SupplyItemService } from '../../../services/supply/supply-item-service';

import { AddOrderComponent } from '../orders/add-order/add-order.component';

import { Search } from "../../common/search";
import { LoadingController } from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
  selector: 'page-supplyItems',
  templateUrl: './supply-items.component.html'
})
export class SupplyItemsComponent extends Search {

  public supplyItemList: Array<SupplyItemModel>;

  constructor(public navCtrl: NavController,
    navParams: NavParams,
    public supplyItemService: SupplyItemService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    private log: LoggerService) {
    super(loadingController);

  }

  ionViewWillEnter() {
    this.getSupplyItems();

  }

  showFindItem() {
    let alert = this.alertController.create({
      title: "Find",
      message: 'Enter an item description',
      inputs: [
        {
          name: 'value',
          placeholder: 'Item Desc'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
              this.log.info('Cancel clicked');
          }
        },
        {
          text: 'Go',
          handler: data => {
            this.log.info('Go clicked');
            this.showLoadingData(data.value);
          }
        }
      ]

    });
    alert.present();

  }

  getSupplyItems() {
    this.supplyItemService.getAllSupplyItems().then(supplyItems => this.supplyItemList = supplyItems);
  }

  itemSelected(item) {

    let options = this.actionSheetController.create({
      buttons: [
        {
          text: 'Order',
          role: 'order',
          handler: () => {
            this.orderItem(item);
          }
        },
         {
          text: 'Detail',
          role: 'all',
          handler: () => {
            if (item) {
              this.showItemDetail(item);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'all',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
              this.log.info('Close clicked');
          }
        }
      ]
    });
    options.present();

  }

  orderItem(item : SupplyItemModel) {
    let orderModal = this.modalController.create(AddOrderComponent, { supplyItem: item});
    orderModal.present();

  }


  showItemDetail(item : SupplyItemModel) {


  }

  showImageDetail(url: string) {
    //  let detailModal = this.modalController.create();
    // detailModal.present();
  }

}

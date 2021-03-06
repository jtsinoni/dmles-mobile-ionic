import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { LoggerService } from "../../services/logger/logger-service";
import { SettingsModel } from "../../models/settings.model";
import { ServerModel } from "../../models/server.model";
import { ModalController } from 'ionic-angular';
// // uncomment to add settings manually in dev
//import { AddSettingComponent } from "./add-setting/add-setting.component";
import { UtilService } from "./../../common/services/util.service";
import { AddServerComponent } from "./add-server/add-server.component";
import { HostServerService } from "../../services/host-server.service";
import {CacSettingComponent} from "./cac/cac-setting.component";
import {AppVersionSettingComponent} from "./app-version/app-version-setting.component";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  settings: Array<SettingsModel> = new Array<SettingsModel>();
  selectedItem: SettingsModel;
  isMobility: boolean = false;
  defaultServer: ServerModel;
  servers: Array<ServerModel>;

  constructor(
    private settingService: SettingsService,
    public modalController: ModalController,
    private log: LoggerService,
    private utilService: UtilService,
    private hostServerService: HostServerService) {
  }

  ionViewDidLoad() {
    this.isMobility = this.utilService.isMobility();
  }

  ionViewWillEnter() {

    this.getSettings();
    this.setDefaultServer();

  }

  private setDefaultServer() {
    Promise.resolve().then(() => {
      return this.hostServerService.getDefaultServer();
    }).then((s) => {
      this.defaultServer = s;
    });
  }

  getSettings() {
    this.settingService.getAll().then((s) => {
      this.settings = s;

    }).catch((error) => {
      this.log.error(error);
    });

  }

  //TODO remove for prod
  addSetting() {
    // // uncomment to add settings manually in dev
    // let addSettingModal = this.modalController.create(AddSettingComponent);
    // addSettingModal.onDidDismiss(model => {
    //   if (model) {

    //     this.getSettings();


    //   }
    // });
    // addSettingModal.present();
    //this.log.debug('no more adding of settings');
  }

  itemSelected(setting: SettingsModel) {
    this.log.debug('you selected setting: ' + setting.settingsName);
    this.selectedItem = setting;
  }


  isHidden(item: SettingsModel, datatype: string) {
    if (datatype != item.dataType) {
      return true;
    } else {
      return false;
    }

  }

  presentAddServer() {
    let addServerModal = this.modalController.create(AddServerComponent);
    addServerModal.onDidDismiss(model => {
      this.setDefaultServer();
    });
    addServerModal.present();
  }

  presentPKardSettings() {
    this.modalController.create(CacSettingComponent).present();
  }

  presentAppVersion() {
    this.modalController.create(AppVersionSettingComponent).present();
  }

  boolChanged(setting: SettingsModel) {
    this.settingService.update(setting);
  }

  numberChanged(setting: SettingsModel) {
    this.settingService.update(setting);
  }

  textChanged(setting: SettingsModel) {
    this.settingService.update(setting);
  }

  selectChanged(setting: SettingsModel) {
    setting.setting = setting.selectedValue;
    this.settingService.update(setting);
  }
}

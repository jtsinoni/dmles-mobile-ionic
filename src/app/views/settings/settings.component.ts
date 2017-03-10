import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { LoggerService } from "../../services/logger/logger-service";
import { SettingsModel } from "../../models/settings.model";
import { ServerModel } from "../../models/server.model";
import { ModalController } from 'ionic-angular';
import { AddSettingComponent } from "./add-setting/add-setting.component";
import { UtilService } from "./../../common/services/util.service";
import { BluetoothModalService } from "../../services/bluetooth-modal.service";
import { AddServerComponent } from "./add-server/add-server.component";
import { HostServerService } from "../../services/host-server.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  settings: Array<SettingsModel> = new Array<SettingsModel>();
  settingsCount: number = 0;
  selectedItem: SettingsModel;
  isMobility: boolean = false;
  defaultServer: ServerModel;
  servers: Array<ServerModel>;

  constructor(
    private settingService: SettingsService,
    public modalController: ModalController,
    private log: LoggerService,
    private utilService: UtilService,
    private bluetoothModalService: BluetoothModalService,
    private hostServerService: HostServerService) {
  }

  ionViewWillEnter() {

    if (this.utilService.isMobility()) {
      this.isMobility = true;
      this.setSettingsCount();
      this.log.debug('settings count is: ' + this.settingsCount);

      if (this.settingsCount < 1) {
        // add settings to the db from asset file
        this.log.debug('getting asset file');
        this.settingService.getAssetFile().map(results => results.json())
          .subscribe((results) => {
            this.settings = results;
            this.log.debug(`getAssetFile data => ${JSON.stringify(results)}`);
          });
        for (let s of this.settings) {
          this.settingService.add(s);
        }
        this.log.debug("added settings from asset file");

      }
    }
    this.settingService.getAll().then((s) => {
      this.settings = s;
      if (s) {
        this.log.debug(`Got => ${s.length} from IndexedDB`)
      }
    })
      .catch((error) => {
        this.log.error(error);
      });

    

    this.getSettings();
    this.setDefaultServer();

  }

  private setDefaultServer()  {
    Promise.resolve().then(() => {
      return this.hostServerService.getDefaultServer();
    }).then((tt) => {  
        this.log.debug('what is tt: ' + tt);
        this.defaultServer = tt;
    });
  }

  getSettings() {
    this.settingService.getAll().then((s) => {
      this.settings = s;

    }).catch((error) => {
      this.log.error(error);
    });

  }


  private setSettingsCount() {
    this.settingService.getCount().then((c) => {
      this.settingsCount = c;
    })

  }

  //TODO remove for prod
  addSetting() {
    let addSettingModal = this.modalController.create(AddSettingComponent);  
    addSettingModal.onDidDismiss(model => {
      if (model) {       
        this.getSettings();
      }
    })
    addSettingModal.present();    
   
  }

  itemSelected(setting: SettingsModel) {
    this.log.debug('you selected setting: ' + setting.settingName);
    this.selectedItem = setting;
  }


  isHidden(item: SettingsModel, datatype: string) {
    if (datatype != item.dataType) {
      return true;
    } else {
      return false;
    }

  }

  presentBluetoothModal() {
    this.bluetoothModalService.presentModal();
  }

  presentAddServer() {
    let addServerModal = this.modalController.create(AddServerComponent);
    addServerModal.present();
  }
}

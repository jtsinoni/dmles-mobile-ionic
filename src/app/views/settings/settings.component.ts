import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { LoggerService } from "../../services/logger/logger-service";
import { SettingsModel } from "../../models/settings.model";
import { ModalController } from 'ionic-angular';
import { AddSettingComponent } from "./add-setting/add-setting.component";
import { UtilService } from "./../../common/services/util.service";

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {


  settings: Array<SettingsModel> = new Array<SettingsModel>();
  settingsCount: number = 0;
  selectedItem: SettingsModel;
  isMobility: boolean = false;


  constructor(
    private settingService: SettingsService,
    public modalController: ModalController,
    private log: LoggerService,
    private utilService: UtilService) {
  }

  ionViewWillEnter() {
    // if (this.utilService.isMobility()) {
    //   this.isMobility = true;
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
    //}
    this.settingService.getAll().then((s) => {
      this.settings = s;
      if (s) {
        this.log.debug(`Got => ${s.length} from IndexedDB`)
      }
    })
      .catch((error) => {
        this.log.error(error);
      });

  }


  private setSettingsCount() {
    this.settingService.getCount().then((c) => {
      this.settingsCount = c;
    })

  }

  addSetting() {
    let addSettingModal = this.modalController.create(AddSettingComponent);
    addSettingModal.present();
    this.log.debug('showing add settings for DEV ionic serve in browser');
  }

  itemSelected(setting: SettingsModel) {
    this.log.debug('you selected setting: ' + setting.settingName);
    this.selectedItem = setting;
  }

  // updateSetting() {
  //   if (this.selectedItem) {
  //     // set editor visible on datatype
  //     this.log.debug('updating setting: ' + this.selectedItem.settingName);
  //     this.selectedItem = null;
  //   }
  // }

}

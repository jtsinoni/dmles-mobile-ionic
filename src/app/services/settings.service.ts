import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { SettingsModel } from '../models/settings.model'
import { BaseDatabaseService } from './database/base-database.service';
import { DatabaseTableModelService } from './database/database-table-model.service';
import { AppConfigConstants } from "../constants/app-config.constants";


@Injectable()
export class SettingsService extends BaseDatabaseService<SettingsModel> {
    assetFilename: string = "app-settings.json";
    assetDirectory: string = "assets/files";

    constructor(
        databaseService: DatabaseTableModelService,
        log: LoggerService,
        private http: Http) {
        super('Settings Service', databaseService.getSettingsDataTable(), log);

    }

    public getAssetFile() {

        let items: Array<SettingsModel>;
        let count = 0;
        let url: string = this.assetDirectory + '/' + this.assetFilename;
        this.getCount().then((c) => {
            count = c;
            if (count < 1) {
                this.log.debug('count in service is:' + count);
                this.http.get(url)
                    .subscribe(data => {
                        items = data.json();
                    }, error => {
                        this.log.error(error);
                    }, () => {
                        for (let s of items) {
                            this.log.info(s.settingsName);
                            s.selectedValue = s.setting;
                            this.add(s);
                        }
                    });
            }
        });

    }

    isBluetoothBarcodePrinterSettingsCallback = (s: SettingsModel): boolean => {
        return s.settingsName === AppConfigConstants.printer.bluetoothBarcodeKey;
    }

    getBluetoothBarcodePrinterSettingsCount(): Promise<number> {
        return this.getFilteredCount(this.isBluetoothBarcodePrinterSettingsCallback);
    }

    deleteBluetoothBarcodePrinterSettings(): Promise<number> {
        return this.deleteFilteredCollection(this.isBluetoothBarcodePrinterSettingsCallback);
    }

    actionPositionSettingCallBack = (s: SettingsModel): boolean => {
        return s.settingsName == "Action Position";
    }

    getActionPositionSetting(): Promise<SettingsModel> {
        return this.findFirst(this.actionPositionSettingCallBack);

    }

    enableScannerSettingCallBack = (s: SettingsModel): boolean => {
        return s.settingsName == "Enable Scanner";
    }

    getEnableScannerSetting(): Promise<SettingsModel> {
        return this.findFirst(this.enableScannerSettingCallBack);
    }


}

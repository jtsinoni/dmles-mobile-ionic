import {Http} from "@angular/http";
import {Observable} from "rxjs";
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger/logger-service";
import { SettingsModel } from '../models/settings.model'
import { BaseDatabaseService } from '../services/base-database.service';
import { DexieDatabaseService } from '../services/dexie-database.service';
import { LocalFileStorageService} from '../services/local-file-storage.service';


@Injectable()
export class SettingsService extends BaseDatabaseService<SettingsModel> {
    assetFilename: string = "app-settings.json";
    assetDirectory: string = "files";
    constructor(
        databaseService: DexieDatabaseService,
        private localFileStorageService: LocalFileStorageService,
        log: LoggerService,
        private http: Http) {
        super('Settings Service', databaseService.getSettingsDataTable(), log);
    }

      public getAssetFile() : Observable<any> {
        let url: string = this.assetDirectory + '/' + this.assetFilename;
        this.log.debug('asset URL:' + url);

        return this.http.get(url);

    }

    isBooleanSettingsCallback = (s: SettingsModel): boolean => {
        return s.dataType === 'boolean';
    }

    getBooleanSettingsCount():Promise<number> {
        return this.getFilteredCount(this.isBooleanSettingsCallback);
    }

    isBluetoothBarcodePrinterSettingsCallback = (s: SettingsModel): boolean => {
        return s.settingName === 'BluetoothBarcodePrinter';
    }

    getBluetoothBarcodePrinterSettingsCount():Promise<number> {
        return this.getFilteredCount(this.isBluetoothBarcodePrinterSettingsCallback);
    }

    deleteBluetoothBarcodePrinterSettings():Promise<number> {
        return this.deleteFilteredCollection(this.isBluetoothBarcodePrinterSettingsCallback);
    }


}

import {BaseDataTableModel} from './base-data-table.model';

export interface ISettingsModel {
    settingName: string;
    setting: any;   
    dataType: string;
}

export class SettingsModel extends BaseDataTableModel implements ISettingsModel {
   
    settingName: string
    setting: any;
    dataType: string;
    
    constructor(key: string, setting: any, dataType: string, id?: number) {
        super(id);
        this.settingName = key;
        this.setting = setting;
        this.dataType = dataType
    }

    toString() : string {
        return this.id + ' ' + this.settingName + ' ' + this.setting;
    }


   

}

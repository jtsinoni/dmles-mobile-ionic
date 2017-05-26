import {BaseDataTableModel} from './base-data-table.model';

export interface ISettingsModel {
    settingsName: string;
    setting: any;   
    dataType: string;
}

export class SettingsModel extends BaseDataTableModel implements ISettingsModel {
   
    settingsName: string
    setting: any;
    dataType: string;
    values: Array<any>;
    selectedValue: any;
    
    constructor(key: string, setting: any, dataType: string, id?: number) {
        super(id);
        this.settingsName = key;
        this.setting = setting;
        this.dataType = dataType
        this.selectedValue = setting;

    }

    toString() : string {
        return this.id + ' ' + this.settingsName + ' ' + this.setting;
    }


   

}

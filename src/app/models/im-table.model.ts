import {BaseDataTableModel} from './base-data-table.model';

export class IMTableModel extends BaseDataTableModel {
    id?: number;
    barcodeData: string;
    barcodeType?: string;

    constructor(barcodeData: string, barcodeType?: string, id?: number) {
        super(id);
        if(barcodeData) {
            this.barcodeData = barcodeData;
        }
        if(barcodeType) {
            this.barcodeType = barcodeType;
        }
    }
}


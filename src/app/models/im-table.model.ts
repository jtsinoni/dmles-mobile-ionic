import {BaseDataTableModel} from './base-data-table.model';

export class IMTableModel extends BaseDataTableModel {
    id?: number;
    barcodeData: string;
    barcodeType?: string;

    constructor(barcodeData: string, id?: number, barcodeType?: string) {
        super(id);
        this.barcodeData = barcodeData;
        if (id) {
            this.id = id;
        }
        if (barcodeType) {
            this.barcodeType = barcodeType;
        }
    }
}


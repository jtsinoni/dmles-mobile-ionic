import {BarcodeTableModel} from "./barcode-table.model";

export class ABiBarcodeTableModel extends BarcodeTableModel {
    constructor(barcodeData: string, barcodeType?: string, id?: number) {
        super(barcodeData, barcodeType, id);
    }
}


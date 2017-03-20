import { BaseDataTableModel } from './base-data-table.model';

export class EquipmentRequestModel extends BaseDataTableModel {
    requestNumber: number;
    requestTitle: string;
    quantityRequested: number;
    totalRequisitionCost: number;
    submitter: string;
    organization: string;
    customer: string;
    currentStatus: string;
    level : string;
    updatedDate: Date;
    //id: number = this.requestNumber;
    constructor(id?: number) {
        super(id);
    }

}

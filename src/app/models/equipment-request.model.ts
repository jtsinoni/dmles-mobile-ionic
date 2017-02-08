import { DataItemModel } from './data-item.model';

export class EquipmentRequestModel extends DataItemModel<number> {
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
    id: number = this.requestNumber;

}

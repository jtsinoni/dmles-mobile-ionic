
import { BaseDataTableModel } from './base-data-table.model';

export class IssueModel extends BaseDataTableModel {
    documentNumber: string;
    itemId: string;
    issueDate: string;
    issueState: number;
    quantityIssued: number;
    requestor: string;
    //id: string = this.documentNumber;
    constructor(id) {
        super(id);
    }

}
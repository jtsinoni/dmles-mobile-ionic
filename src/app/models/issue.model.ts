
import { DataItemModel } from './data-item.model';

export class IssueModel extends DataItemModel<string> {
    documentNumber: string;
    itemId: string;
    issueDate: string;
    issueState: number;
    quantityIssued: number;
    requestor: string;
    id: string = this.documentNumber;

}
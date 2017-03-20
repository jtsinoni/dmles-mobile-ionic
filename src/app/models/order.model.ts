
import { BaseDataTableModel } from './base-data-table.model';

export class OrderModel extends BaseDataTableModel {
    public documentNumber: string;
    public orderQuantity: number;
    public itemId: string;
    public unitOfPurchasePrice: number;
    public orderDate: Date;
    public requiredDate: string
    public requestor: string;
    public orderState: number;
    public referenceId: string;
    //id:string; 

    constructor(id?: number) {
        super(id);
    }

}
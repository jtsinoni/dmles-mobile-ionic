
import { DataItemModel } from './data-item.model';

export class OrderModel extends DataItemModel<string> {
    public documentNumber: string;
    public orderQuantity: number;
    public itemId: string;
    public unitOfPurchasePrice: number;
    public orderDate: Date;
    public requiredDate: Date;
    public requestor: string;
    public orderState: number;
    id:string; 

}
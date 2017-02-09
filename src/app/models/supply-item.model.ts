
import { DataItemModel } from './data-item.model';
export class SupplyItemModel extends DataItemModel<string> {

    public itemId : string;
    public itemDescription: string;
    public unitOfPurchasePrice: number;
    public onHandBalance: number;
    id:string = this.itemId; 
    imageUrl: string;
    isStocked:boolean;

}
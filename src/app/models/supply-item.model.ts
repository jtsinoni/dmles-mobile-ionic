
import { BaseDataTableModel } from './base-data-table.model';
export class SupplyItemModel extends BaseDataTableModel {
   
    public itemId : string;
    public itemDescription: string;
    public unitOfPurchasePrice: number;
    public onHandBalance: number;
    //id:string = this.itemId; 
    imageUrl: string;
    isStocked:boolean;

    constructor(id?: number) {
        super(id);
    }

}
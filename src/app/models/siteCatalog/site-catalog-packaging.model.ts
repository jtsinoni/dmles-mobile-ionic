import { BaseDataTableModel } from "../base-data-table.model";

interface ISiteCatalogPackagingModel {
    packPriceAmt: number;
    ipPackCd: string;
    ipPackQty: number;
}

export class SiteCatalogPackagingModel extends BaseDataTableModel implements ISiteCatalogPackagingModel {    

public packPriceAmt:number;
public ipPackCd: string;
public ipPackQty: number;


constructor(initData:ISiteCatalogPackagingModel , id?: number) {
        super(id);
    }  

}
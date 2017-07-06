import { BaseDataTableModel } from './base-data-table.model';

export class SiteCatalogModel extends BaseDataTableModel {    
    public siteDodaac: string = "";
    public itemId: string = "";
    public manufacturerNm: string = "";
    public manufCatNum: string = "";
    public ndc: string = "";
    public longItemDesc: string = "";
    public sources: Array<any> = [];
    public orderCost: number = 0;
    public orderCount: number = 0;

    public siteName: string = "";
    
    constructor(id?: number) {
        super(id);
    }  

}
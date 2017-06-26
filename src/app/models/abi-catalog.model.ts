import { BaseDataTableModel } from './base-data-table.model';

export class ABiCatalogModel extends BaseDataTableModel {
    manufacturerCatalogNumber: string;
    fullDescription: string;
    manufacturer: string; //mec...
    ghxProductIdentifier:string;
    longItemDescription:string;
    unspscFamily:string;
    catalogSource:string;
    ghxManufacturer:string;
    productType:string;
    enterpriseProductIdentifierType:string;
    shortItemDescription:string;
    productStatus: string;
    clinicalDescription: string;
    unspscCommodity:string;
    unspscCode:string;
    enterpriseProductIdentifier:string;
    productNoun:string;
    locations:Array<any>;
    packaging:Array<any>;
    // test input value, not an ABi data element
    quantity:number;
    preferredProductIndicator:string;
    isPreferredItem: boolean;

    
    constructor(id?: number) {
        super(id);
        this.quantity = 0;
        this.setPreferredItem();
    }

    setPreferredItem()  {
        this.isPreferredItem = (this.preferredProductIndicator.toUpperCase() === "Y");
    }

}

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
    unspscCode:string; // TODO num?
    enterpriseProductIdentifier:string;
    productNoun:string;
    locations:Array<any>;

    
    constructor(id?: number) {
        super(id);
    }

}

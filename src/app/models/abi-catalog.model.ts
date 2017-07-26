import {BaseDataTableModel} from './base-data-table.model';

export class ABiCatalogModel extends BaseDataTableModel {
    manufacturerCatalogNumber: string;
    fullDescription: string;
    manufacturer: string;
    ghxProductIdentifier: string;
    longItemDescription: string;
    unspscFamily: string;
    catalogSource: string;
    ghxManufacturer: string;
    productType: string;
    enterpriseProductIdentifierType: string;
    shortItemDescription: string;
    productStatus: string;
    clinicalDescription: string;
    unspscCommodity: string;
    unspscCode: string;
    enterpriseProductIdentifier: string;
    productNoun: string;
    locations: Array<any>; // a string array of location names

    // a name value pair of properties
    // // i.e
    // { "packageUnitDescription": "Case of 100",
    // "packageUnit": "CA",
    // "packageUnitText": "Case",
    // "packageQuantity": 100 }
    packaging: Array<any>;

    preferredProductIndicator: string;
    siteCount: number;
    ndc: string; //NDC
    deviceClassText: string;  //Device Class
    deviceText: string;  //Device
    productComposition: any; //Product Composition, sometimes an array of names, sometimes a string, ABi make up your mind?
    trademarkBrandnames: Array<any>; //Trademark/Brand Names, a string array of names
    brandGeneric: string; //Brand Type
    deaCode: string; //DEA Code
    drugCategory: string; //Label Type
    drugStorageType: string; //Storage Type
    sizeShape: string; //Size/Shape
    productProperties: Array<any>; //Properties, a string array of product properties
    miscellaneous: Array<any>; //Additional Information, a string array of names
    age: string; //Age
    gender: string; //Gender
    color: string; //Color
    flavor: string; //Flavor
    fragrance: string; //Fragrance
    disposableReusable:string; //Disposable
    diameter: string; //Diameter
    volume: string; //Volume
    weight: string; //Weight
    lengthWidthHeight: string; //Dimensions
    lengthWidthHeight2: string; //Secondary Dimensions
    sterileNonsterile: string; //Sterility
    hazardCode: string; //Hazard
    latexCode: string; //Latex
    mmcProductIdentifier: string;

    isPreferredProduct: boolean = false;
    
    // test input value, not an ABi data element
    quantity: number;

    constructor(id?: number) {
        super(id);
        this.quantity = 0;
    }

}

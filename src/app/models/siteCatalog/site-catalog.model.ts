import { BaseDataTableModel } from '../base-data-table.model';
import { SiteCatalogSourcesModel } from './site-catalog-sources.model';

interface ISiteCatalogModel {
   siteDodaac: string;
    itemId: string;
    manufacturerNm: string;
    manufCatNum: string;
    ndc: string;
    longItemDesc: string;
    sources: Array<SiteCatalogSourcesModel>;
    
    primarySupplier: string;
    primarySourcePrice: number;
    primarySourcePackCode: string;
    primarySourcePackQuantity: number;
    
    
}

export class SiteCatalogModel extends BaseDataTableModel implements ISiteCatalogModel {    
    public siteDodaac: string = "";
    public itemId: string = "";
    public manufacturerNm: string = "";
    public manufCatNum: string = "";
    public ndc: string = "";
    public longItemDesc: string = "";
    public sources: Array<SiteCatalogSourcesModel>;
    
    public primarySupplier: string = "";
    public primarySourcePrice: number = 0;
    public primarySourcePackCode: string = "";
    public primarySourcePackQuantity: number = 0;
    
    

    public siteName: string = "";
    
    constructor(initData: ISiteCatalogModel, id?: number) {
        super(id);
    } 
    
    setSupplierName() {
        if (this.sources && this.sources.length > 0) { 
            this.primarySupplier = this.sources[0].supplierNm;
        }

       
    }

    setPackPrice()  {
         if (this.sources && this.sources.length > 0 
            && this.sources[0].packaging &&  this.sources[0].packaging.length > 0) { 
            this.primarySourcePrice = this.sources[0].packaging[0].packPriceAmt;
        } 
    }

    setPackQuantity() {
         if (this.sources && this.sources.length > 0 
            && this.sources[0].packaging &&  this.sources[0].packaging.length > 0) { 
            this.primarySourcePackQuantity = this.sources[0].packaging[0].ipPackQty;
        } 
    }

    setPackCode() {
         if (this.sources && this.sources.length > 0 
            && this.sources[0].packaging &&  this.sources[0].packaging.length > 0) { 
            this.primarySourcePackCode = this.sources[0].packaging[0].ipPackCd;
        } 
    }




}
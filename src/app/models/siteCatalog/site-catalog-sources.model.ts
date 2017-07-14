import { BaseDataTableModel } from '../base-data-table.model';
import { SiteCatalogPackagingModel } from './site-catalog-packaging.model';

interface ISiteCatalogSourcesModel {
    sosSerial: number;
    sosCd: string;
    sosTypeCd: string;
    supplierNm: string;
    typeItemId: string;
    vendItemNum: string;
    ipPackSerial: number;
    dropShipFeeInd: string;
    dropShipOnlyInd: string;
    packaging: Array<SiteCatalogPackagingModel>;
}

export class SiteCatalogSourcesModel extends BaseDataTableModel implements ISiteCatalogSourcesModel {

    public sosSerial: number;
    public sosCd: string;
    public sosTypeCd: string;
    public supplierNm: string;
    public typeItemId: string;
    public vendItemNum: string;
    public ipPackSerial: number;
    public dropShipFeeInd: string;
    public dropShipOnlyInd: string;
    public packaging: Array<SiteCatalogPackagingModel>;


    constructor(initData: ISiteCatalogSourcesModel, id?: number) {
        super(id);
    }



    

}
import { BaseResultModel } from './base-result.model';
import { ABiCatalogModel } from './abi-catalog.model';

export class ABiCatalogResultModel extends BaseResultModel {

    public items: Array<ABiCatalogModel>; 
    constructor() {
        super();
        this.items = new Array();
    }
}

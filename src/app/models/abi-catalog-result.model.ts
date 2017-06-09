import { BaseResultModel } from './base-result.model';
import { ABiCatalogModel } from './abi-catalog.model';

export class ABiCatalogResultModel extends BaseResultModel<ABiCatalogModel> {

    constructor() {
        super();
        this.items = new Array();
        this.resultCount = 0;
    }
}

/**
 * Created by johntsinonis on 11/11/16.
 */
import { Injectable }    from '@angular/core';
import {CommonDataModel} from "../models/common-data.model";
import {StoreDataModel} from "../models/store-data.model";
import {ForwardDataModel} from "../models/forward-data.model";

@Injectable()
export class CommonDataService {
    public data: CommonDataModel;
    public storeDataModel: StoreDataModel;
    public forwardDataModel: ForwardDataModel;
    constructor () {
        this.data = new CommonDataModel();
        this.storeDataModel = new StoreDataModel();
        this.forwardDataModel = new ForwardDataModel();
    }
}

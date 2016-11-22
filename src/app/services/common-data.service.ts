/**
 * Created by johntsinonis on 11/11/16.
 */
import { Injectable }    from '@angular/core';
import {CommonDataModel} from "../models/common-data.model";

@Injectable()
export class CommonDataService {
    public data: CommonDataModel;
    constructor () {
        this.data = new CommonDataModel();
    }
}

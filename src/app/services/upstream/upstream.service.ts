import {Injectable} from "@angular/core";
import {ConnectivityService} from "../connectivity.service";
import Dexie from "dexie";
//import {Network} from 'ionic-native';
/**
 * Created by johntsinonis on 11/10/16.
 */
@Injectable()
export class UpstreamService {
    constructor() {
    }

    sendData(param: any): Dexie.Promise<any> {
        return undefined;
    }
}

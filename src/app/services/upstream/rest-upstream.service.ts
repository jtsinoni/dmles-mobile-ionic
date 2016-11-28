/**
 * Created by johntsinonis on 11/10/16.
 */
import { Injectable }    from '@angular/core';

import { UpstreamService } from './upstream.service'
import Dexie from "dexie";

@Injectable()
export class RestUpstreamService extends UpstreamService {

    sendData(param?: any): Dexie.Promise<any> {
        console.log('RestUpstreamService: ' + param);
        return undefined;
    }

}

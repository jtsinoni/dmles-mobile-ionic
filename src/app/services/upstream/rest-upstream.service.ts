/**
 * Created by johntsinonis on 11/10/16.
 */
import { Injectable }    from '@angular/core';

import { UpstreamService } from './upstream.service'

@Injectable()
export class RestUpstreamService extends UpstreamService {

    sendData(param?: any): boolean {
        console.log('RestUpstreamService: ' + param);
        return undefined;
    }

}

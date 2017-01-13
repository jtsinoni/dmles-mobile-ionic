import { Injectable }    from '@angular/core';

import { UpstreamService } from './upstream.service'
import {LoggerService} from "../logger/logger-service";
import {CommonDataService} from "../common-data.service";

@Injectable()
export class RestUpstreamService extends UpstreamService {
    constructor(public commonDataService: CommonDataService,
                public log: LoggerService) {
        super(commonDataService, log);
    }

    sendData(param?: any): Promise<any> {
        this.log.info('RestUpstreamService: ' + param);
        return undefined;
    }

}

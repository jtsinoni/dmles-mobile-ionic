import {Injectable}    from '@angular/core';

import {UpstreamService } from './upstream.service'
import {LoggerService} from "../logger/logger-service";
import {MessagingDataService} from "../messaging-data.service";

@Injectable()
export class IMUpstreamService extends UpstreamService {
    constructor(public messagingDataService: MessagingDataService,
                public log: LoggerService) {
        super(messagingDataService, log);
    }

    sendData(param?: any): Promise<any> {
        this.log.info('IMUpstreamService: ' + param);
        return undefined;
    }

}

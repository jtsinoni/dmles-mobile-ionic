/**
 * Created by johntsinonis on 11/10/16.
 */
import { Injectable }    from '@angular/core';

import { RestUpstreamService } from './rest-upstream.service';
import { TopicUpstreamService } from './topic-upstream.service';
import { UpstreamService } from './upstream.service';

@Injectable()
export class FactoryUpstreamService {
    public static createService(type: string) : UpstreamService {
        switch(type) {
            case 'rest':
                return new RestUpstreamService();
            case 'topic':
                return new TopicUpstreamService();
            default:
                return null;
        }
    }
}

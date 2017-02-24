import {Injectable}    from '@angular/core';
import {LoggerService} from "./logger/logger-service";

// The global javascript window object
declare var window: any;

@Injectable()
export class WindowService {
    private serviceName = "WindowService";
    public window = window;

    constructor(private log: LoggerService) {
        this.init();
    }

    private init(): void {
        this.log.debug(`${this.serviceName} - Start`);
    }
}

import {NgModule, ModuleWithProviders} from "@angular/core";
import {LocalStorageService} from "./local-storage.service";
import {LocalDevStorageService} from "./local-dev-storage.service";
import {LocalNativeStorageService} from "./local-native-storage.service";
import {LocalSecureStorageService} from "./local-secure-storage.service";
import {UtilService} from "../../common/services/util.service";
import {LoggerService} from "../logger/logger-service";
import {WindowService} from "../window.service";
import {Platform} from "ionic-angular";

export class StorageFactory {
    constructor(log: LoggerService, utilService: UtilService, windowService: WindowService, platform: Platform) {
        if(utilService.isProd()) {
            return new LocalSecureStorageService(log, platform);
        } else if(utilService.isMobility()) {
            return new LocalNativeStorageService(log);
        } else {
            return new LocalDevStorageService(log, windowService);
        }
    }
}

@NgModule({
})
export class LocalStorageModule {

    static forRoot():ModuleWithProviders {
        return {
            ngModule: LocalStorageModule,
            providers: [LocalDevStorageService, LocalNativeStorageService, LocalSecureStorageService,
                        { provide: LocalStorageService,
                          useFactory: StorageFactory,
                          deps: [LoggerService, UtilService, WindowService, Platform] }]
        };
    }

}

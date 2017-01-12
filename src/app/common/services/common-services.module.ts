import {NgModule, ModuleWithProviders} from "@angular/core";

import {UtilService} from "./util.service";
import {BaseSelectFilterService} from "./base-select-filter.service";
import {Base64Service} from "./base64.service";
import {OAuthService} from "../../services/oauth.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {AppService} from "../../services/app.service";
import {AppConfig} from "../../configs/app-config";
import {DatabaseService} from "../../services/database.service";
import {CommonDataService} from "../../services/common-data.service";
import {NetworkService} from "../../services/network.service";
import {TopicUpstreamService} from "../../services/upstream/topic-upstream.service";
import {TopicMessagingService} from "../../services/topic-messaging.service";
import {UpstreamService} from "../../services/upstream/upstream.service";
import {NotificationService} from "../../services/notification.service";
import {LogViewerService} from "../../services/log-viewer.service";
import {LocalFileStorageService} from "../../services/local-file-storage.service";
import {FileLoggerService} from "../../services/logger/file-logger-service";
import {LoggerService} from "../../services/logger/logger-service";

@NgModule({
})
export class CommonServicesModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: CommonServicesModule,
            providers: [Base64Service, BaseSelectFilterService, UtilService,
                        LocalStorageService, AuthenticationService,
                        AppConfig, AppService, OAuthService,
                        DatabaseService, CommonDataService, NetworkService, NotificationService,
                        TopicUpstreamService, TopicMessagingService, LogViewerService, LocalFileStorageService,
                        { provide: UpstreamService, useClass: TopicUpstreamService },
                        { provide: LoggerService, useClass: FileLoggerService }]
        };
    }

}

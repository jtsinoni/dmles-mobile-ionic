import {NgModule, ModuleWithProviders} from "@angular/core";

import {UtilService} from "./util.service";
import {BaseSelectFilterService} from "./base-select-filter.service";
import {Base64Service} from "./base64.service";
import {OAuthService} from "../../services/oauth.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AppService} from "../../services/app.service";
import {StoreDatabaseService} from "../../services/database/store-database.service";
import {CommonDataService} from "../../services/common-data.service";
import {NetworkService} from "../../services/network.service";
import {TopicMessagingService} from "../../services/topic-messaging.service";
import {NotificationService} from "../../services/notification.service";
import {LogViewerService} from "../../services/log-viewer.service";
import {LocalFileStorageService} from "../../services/local-file-storage.service";
import {JSONWebTokenService} from "../../services/jason-web-token.service";
import {LoginModalService} from "../../services/login-modal.service";
import {HostServerService} from "../../services/host-server.service";
import {SettingsService} from "../../services/settings.service";
import {DatabaseTableModelService} from "../../services/database/database-table-model.service";
import {WindowService} from "../../services/window.service";
import {BluetoothModalService} from "../../services/bluetooth-modal.service";
import {CACService} from "../../services/cac.service";
import {BarcodeScannerService} from "../../services/barcode-scanner.service";
import {IMDatabaseService} from "../../services/database/im-database.service";
import {EquipReqTopicUpstreamService} from "../../services/upstream/equip-req-topic-upstream.service";
import {IMTopicUpstreamService} from "../../services/upstream/im-topic-upstream.service";
import {ABiTopicUpstreamService} from "../../services/upstream/abi-topic-upstream.service";
import {ABiDatabaseService} from "../../services/database/abi-database.service";


@NgModule({
})
export class CommonServicesModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: CommonServicesModule,
            providers: [
                Base64Service,
                BaseSelectFilterService,
                UtilService,
                AuthenticationService,
                WindowService,
                AppService,
                OAuthService,
                StoreDatabaseService,
                CommonDataService,
                NetworkService,
                NotificationService,
                TopicMessagingService,
                LogViewerService,
                LocalFileStorageService,
                JSONWebTokenService,
                LoginModalService,
                SettingsService,
                HostServerService,
                DatabaseTableModelService,
                BluetoothModalService,
                CACService,
                BarcodeScannerService,
                IMDatabaseService,
                EquipReqTopicUpstreamService,
                IMTopicUpstreamService,
                ABiTopicUpstreamService,
                ABiDatabaseService,

                // { provide: UpstreamService, useClass: TopicUpstreamService },
            ]
        };
    }
}

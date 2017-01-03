import {NgModule, ModuleWithProviders} from "@angular/core";

import {UtilService} from "./util.service";
import {BaseSelectFilterService} from "./base-select-filter.service";
import {Base64Service} from "./base64.service";
import {OAuthService} from "../../services/oauth.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {AppService} from "../../services/app.service";
import {AppConfig} from "../../configs/app-config";

@NgModule({
})
export class CommonServicesModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: CommonServicesModule,
            providers: [Base64Service, BaseSelectFilterService, UtilService,
                        LocalStorageService, AuthenticationService,
                        AppConfig, AppService, OAuthService]
        };
    }

}

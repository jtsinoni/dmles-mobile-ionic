import {NgModule, ModuleWithProviders} from "@angular/core";
import {RoleService} from "./role.service";
import {RequestApiService} from "./request-api.service";

@NgModule({
})
export class CommonEndpointsModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: CommonEndpointsModule,
            providers: [RoleService, RequestApiService]
        };
    }

}

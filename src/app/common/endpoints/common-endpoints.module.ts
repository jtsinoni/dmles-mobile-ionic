import {NgModule, ModuleWithProviders} from "@angular/core";
import {RoleService} from "./role.service";
import {RequestApiService} from "./request-api.service";
import {InventoryService} from "./inventory.service";

@NgModule({
})
export class CommonEndpointsModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: CommonEndpointsModule,
            providers: [RoleService, RequestApiService, InventoryService]
        };
    }

}

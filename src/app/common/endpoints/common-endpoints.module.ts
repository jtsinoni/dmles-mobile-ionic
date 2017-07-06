import {NgModule, ModuleWithProviders} from "@angular/core";
import {RoleService} from "./role.service";
import {RequestApiService} from "./request-api.service";
import {InventoryService} from "./inventory.service";
import {ABiCatalogService} from './abi-catalog.service';
import { SiteCatalogService } from './site-catalog.service';
import { SystemService } from './system.service';

@NgModule({
})
export class CommonEndpointsModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: CommonEndpointsModule,
            providers: [
                RoleService, 
                RequestApiService, 
                InventoryService, 
                ABiCatalogService, 
                SiteCatalogService,
                SystemService]
        };
    }

}

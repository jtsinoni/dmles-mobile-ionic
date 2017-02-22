import {NgModule, ModuleWithProviders} from "@angular/core";
import {LocalStorageService} from "../local-storage.service";

@NgModule({
})
export class LocalStorageModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: LocalStorageModule,
            providers: [LocalStorageService]
        };
    }

}

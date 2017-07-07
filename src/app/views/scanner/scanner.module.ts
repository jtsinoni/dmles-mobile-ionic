import {NgModule} from "@angular/core";
import {IonicModule} from 'ionic-angular';
import {ScannerComponent} from './scanner.component';
import { InputNumericComponent } from './input/input-numeric.component';
import { SiteCatalogListComponent } from '../siteCatalog/site-catalog-list.component';
import {CommonDirectivesModule} from "../../common/directives/common-directives.module";


@NgModule({
    declarations: [ScannerComponent, SiteCatalogListComponent, InputNumericComponent],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [ScannerComponent],
    entryComponents: [ScannerComponent, SiteCatalogListComponent, InputNumericComponent]
})
export class ScannerModule {

}

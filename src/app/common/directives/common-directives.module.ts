/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';
import {HeaderPageComponent} from "../../views/common/header/header-page.component";
import {IonicModule} from "ionic-angular";

@NgModule({
    declarations: [HeaderPageComponent, RemoveParentElementDirective],
    imports: [IonicModule],
    exports: [HeaderPageComponent, RemoveParentElementDirective],
})
export class CommonDirectivesModule{}

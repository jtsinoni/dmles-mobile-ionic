/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';
import {HeaderPageComponent} from "../../views/common/header/header-page.component";
import {IonicModule} from "ionic-angular";
import {AddRippleEffectDirective} from "./add-ripple-effect.directive";

@NgModule({
    declarations: [HeaderPageComponent, RemoveParentElementDirective, AddRippleEffectDirective],
    imports: [IonicModule],
    exports: [HeaderPageComponent, RemoveParentElementDirective, AddRippleEffectDirective],
})
export class CommonDirectivesModule{}

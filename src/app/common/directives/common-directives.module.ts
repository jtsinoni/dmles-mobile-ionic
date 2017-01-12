/**
 * Created by johntsinonis on 1/12/17.
 */
import {NgModule} from '@angular/core';
import {RemoveParentElementDirective} from './remove-parent-element.directive';

@NgModule({
    declarations: [
        RemoveParentElementDirective
    ],
    exports: [
        RemoveParentElementDirective
    ],
})
export class CommonDirectivesModule{}

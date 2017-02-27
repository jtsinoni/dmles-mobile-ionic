import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonDirectivesModule } from "../../common/directives/common-directives.module";
import { HelpComponent } from './help.component';


@NgModule({
    declarations: [
        HelpComponent,
    ],
    imports: [IonicModule, CommonDirectivesModule],
    exports: [
        HelpComponent,
    ],
    entryComponents: [HelpComponent,]
})
export class HelpModule { }

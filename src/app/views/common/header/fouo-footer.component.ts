import { Component} from "@angular/core";

import { LoggerService } from "../../../services/logger/logger-service";


@Component({
    selector: 'fouo-footer',
    templateUrl: './fouo-footer.component.html',
})

export class FouoFooterComponent {
    constructor(private log: LoggerService) {
    }
}

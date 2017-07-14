import { Component, Input } from "@angular/core";
import { SubHeaderComponentInterface } from "../common/header/sub-header-component.interface"


@Component({
    selector: 'site-catalog-header',
    templateUrl: './site-catalog-header.component.html'
})
export class SiteCatalogHeaderComponent implements SubHeaderComponentInterface {
   
    @Input()
    public data: any;

    constructor() {
    }

    
}

import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';

import {LoggerService} from "../../../../services/logger/logger-service";
import {UpstreamService} from "../../../../services/upstream/upstream.service";

@Component({
    templateUrl: 'edit-equip-request-details.component.html',
})
export class EditEquipmentRequestDetailsComponent {
    public selectedItem: any;

    constructor(private viewController: ViewController,
                private params: NavParams,
                private upstreamService: UpstreamService,
                private log: LoggerService) {
        this.selectedItem = this.params.get('selectedItem');
    }

    public update(form: any) {
        this.log.debug(`Updating Equipment Request ... ${JSON.stringify(form)}`);

        this.selectedItem.requestInformation.requestNumber = form.requestNumber;
        this.selectedItem.totalPrice = form.totalPrice;
        this.selectedItem.requestInformation.criticalCode = form.criticalCode;

        this.upstreamService.sendData(this.selectedItem)
            .then((result) => {
                this.dismiss();
            })
    }

    public dismiss() {
        this.viewController.dismiss();
    }
}

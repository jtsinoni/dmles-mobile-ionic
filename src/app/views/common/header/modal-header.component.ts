import { Component, Input } from "@angular/core";
import { ViewController } from "ionic-angular";


@Component({
    selector: 'modal-header',
    templateUrl: './modal-header.component.html',
})

export class ModalHeaderComponent {

    @Input()
    public title: string;
    constructor(private viewController: ViewController) {

    }

    cancel() {
      this.viewController.dismiss();
    }
}

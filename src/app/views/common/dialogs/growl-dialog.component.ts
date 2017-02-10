import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App } from 'ionic-angular';

@Component({
  selector: 'growl-dialog',
  templateUrl: 'growl-dialog.component.html'
})

export class GrowlDialogComponent {
    growlTitle: string;
    growlMessage: string;
    component: Component;

    constructor(public navCtrl: NavController, params: NavParams, public viewController: ViewController, private app: App) {
        this.growlTitle = params.get('growlTitle');
        this.growlMessage = params.get('growlMessage');
    }

    private cancel() {
        this.viewController.dismiss();
    }

    public growlSwiped(event) {
        this.cancel();
    }

}

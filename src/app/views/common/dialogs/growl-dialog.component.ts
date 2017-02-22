import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, App, Platform} from 'ionic-angular';

@Component({
  selector: 'growl-dialog',
  templateUrl: 'growl-dialog.component.html'
})

export class GrowlDialogComponent {
    growlTitle: string;
    growlMessage: string;
    component: Component;
    intervalTimer: any;
    timeoutValue: number;
    isPaused = false;
    countDown: number;
    iconName: string;

    constructor(public navCtrl: NavController,
                params: NavParams,
                public viewController: ViewController,
                private app: App,
                private platform: Platform) {
        this.growlTitle = params.get('growlTitle');
        this.growlMessage = params.get('growlMessage');
        this.timeoutValue = params.get('ttl');
        this.iconName = params.get('iconName');
        if (!this.timeoutValue) {
            this.timeoutValue = 10000;
        }
        this.countDown = this.timeoutValue / 1000;
    }

    ionViewDidEnter() { // ionViewDidLoad() occurs only on initial load
        //this.platform.ready().then(() => {
        this.intervalTimer = setInterval(() => {
            if (!this.isPaused) {
                this.countDown--;
            }
            if (this.countDown <= 0) {
                clearInterval(this.intervalTimer);
                this.cancel();
            }
        }, 1000);
        //});
    }

    ionViewDidLeave() { //NOTE: ionViewDidUnload() - doesn't seem to work
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
    }

    public pauseTimer() {
        this.isPaused = !this.isPaused;
    }

    public cancel() {
        this.viewController.dismiss();
    }

    public growlSwiped(event) {
        this.cancel();
    }

}

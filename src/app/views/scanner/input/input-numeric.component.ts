import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoggerService } from "../../../services/logger/logger-service";

@Component({
    selector: 'input-numeric',
    templateUrl: 'input-numeric.component.html'

})

export class InputNumericComponent {
    quantity: number;

    id: any;

    description: string;

    selectedItem: any;

    isConnected: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private logger: LoggerService,
        public viewController: ViewController) {
        
        this.selectedItem = navParams.get('selected');
        this.id = navParams.get('id');
        this.description = navParams.get('description');
        this.isConnected = navParams.get('isConnected');         
    }


    setData() {
        // todo 
        if (!this.isConnected) {
        // store data locally
        } else {
         // send to server
        }
        this.logger.info('quantity entered: ' + this.quantity + ' for item: ' + this.id);
        this.dismiss();
    }

    dismiss() {
        this.viewController.dismiss();
    }







}
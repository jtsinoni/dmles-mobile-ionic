import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoggerService } from "../../../../services/logger/logger-service";

@Component({
  selector: 'etm-detail',
  templateUrl: 'etm-detail.component.html'
})
export class EtmDetailComponent {

  selectedItem: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private logger: LoggerService) {
    this.selectedItem = navParams.get('selected');
 

          
  }

}

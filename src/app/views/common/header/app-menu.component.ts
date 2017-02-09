import { Component } from "@angular/core";
import { ViewController, App, Platform } from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";
  

@Component({
  templateUrl: './app-menu.component.html'  
  
})
export class AppMenuComponent {

  constructor(
    public viewCtrl: ViewController, 
    private app: App,
    private platform: Platform, 
    private log: LoggerService) { 

  }

  something() {   
    this.log.info('add something here');
  }

  close() {
    this.viewCtrl.dismiss();
  }


}
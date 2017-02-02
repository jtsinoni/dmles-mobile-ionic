import { Component } from '@angular/core';
import { NavController, AlertController, PopoverController, MenuController } from 'ionic-angular';
import { LoggerService } from "./services/logger/logger-service";
import { AppMenuComponent } from "./views/common/header/app-menu.component";


@Component({
    templateUrl: './app-container.html'
})
export class AppContainerComponent {

    constructor(public navCtrl: NavController,
        public alertController: AlertController,
        public log: LoggerService,
        private popoverCtrl: PopoverController,
        private menuController: MenuController) {
        this.menuController.enable(true, "mainMenu");
    }

    showFindItem() {
        let alert = this.alertController.create({
            title: "Search",
            message: 'Find something',
            inputs: [
                {
                    type: 'text',
                    placeholder: 'Search'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        this.log.debug('Cancel clicked');
                    }
                },
                {
                    text: 'Go',
                    handler: data => {
                        this.log.debug('Go clicked');
                        //this.showLoadingData(data.value);
                    }
                }
            ]

        });
        alert.present();
    }

    showAppMenu() {
        let popOver = this.popoverCtrl.create(AppMenuComponent)
        popOver.present();
    }

}


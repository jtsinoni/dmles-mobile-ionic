import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Search} from "../../common/search";
import {LoadingController} from 'ionic-angular';
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
  selector: 'equipment-search',
  templateUrl: 'input-text.component.html'
})

export class InputTextComponent extends Search {
    pushNav: any;
    navTitle: string;
    hintText: string;
    prefix: string;
    aggregations: string;

    constructor(public navCtrl: NavController,
                public loadingCtrl: LoadingController,
                public navParams: NavParams,
                private log: LoggerService) {
        super(loadingCtrl);
    }

    ngOnInit() {
        // If we navigated to this page, we will have an item available as a nav param
        this.pushNav = this.navParams.get('pushNav');
        this.navTitle = this.navParams.get('navTitle');
        this.hintText = this.navParams.get('hintText');
        this.prefix = this.navParams.get('prefix');
        this.aggregations = this.navParams.get('aggregations');
    }

    public saveTheData(value: string) {
        let searchValue = this.prefix + "'" + value + "'";
        this.log.info('You entered (' + value + ', ' + searchValue + ', ' + this.aggregations + '), lets call ??? (' + this.navTitle + ', hintText=' + this.hintText + ')');

        // MAGIC - we receive the destination page as a parm that this page will "push", or navigate too, making this page a 'pass-thru' page acquiring user input
        this.navCtrl.push(this.pushNav, {
            navTitle: this.navTitle,
            hintText: this.hintText,
            searchValue: searchValue,
            aggregations: this.aggregations
        });
    }
}

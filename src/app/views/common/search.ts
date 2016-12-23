
import { LoadingController } from 'ionic-angular';

export class Search {

    public searchValue: string;

    constructor (public loadingCtrl: LoadingController) {
        this.searchValue = '';

    }

    public showLoadingData(value: string) {    
        let loader = this.loadingCtrl.create( {
            content: "Searching for " + value,
            duration: 3000
        });
        loader.present();
    }
}
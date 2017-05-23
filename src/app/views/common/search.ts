import { LoadingController, Loading } from 'ionic-angular';

export class Search {

    public searchValue: string;
    private loader: Loading;
    constructor (public loadingCtrl: LoadingController) {
        this.searchValue = '';
    }

    public showLoadingData(value: string) {
        this.loader = this.loadingCtrl.create( {
            content: "Searching for " + value
        });
        this.loader.present();
    }

    public loadingEnded() {
        this.loader.dismiss();
    }
}

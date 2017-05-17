import {LoadingController} from 'ionic-angular';
import {NetworkService} from "../../services/network.service";
import {AppInjector} from "../../app.module";
import {Network} from "ionic-native";
import {Input} from "@angular/core/src/metadata/directives";

export class Search {
    @Input()
    public isConnected: boolean;

    @Input()
    public searchValue: string;

    public networkService: NetworkService;

    constructor (public loadingCtrl: LoadingController) {
        this.init();
    }

    private init(){
        this.searchValue = '';

        this.networkService = AppInjector.get(NetworkService);

        // get initial state of connection
        this.isConnected = this.networkService.isConnected;

        Network.onConnect().subscribe(() => {
            this.isConnected = true;
        });

        Network.onDisconnect().subscribe(() => {
            this.isConnected = false;
        });
    }

    public showLoadingData(value: string) {
        let loader = this.loadingCtrl.create( {
            content: "Searching for " + value,
            duration: 3000
        });
        loader.present();
    }
}

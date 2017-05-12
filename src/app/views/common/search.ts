import { LoadingController } from 'ionic-angular';
import {NetworkService} from "../../services/network.service";
import {LoggerService} from "../../services/logger/logger-service";
import {AppInjector} from "../../app.module";

export class Search {

    public searchValue: string;
    public isConnected: boolean;
    public networkService: NetworkService;
    private logger: LoggerService;

    constructor (public loadingCtrl: LoadingController) {
        this.init();
    }

    private init(){
        this.searchValue = '';

        this.networkService = AppInjector.get(NetworkService);
        this.logger = AppInjector.get(LoggerService);

        // get initial state of connection
        this.isConnected = this.networkService.isConnected;

        // for subsequent state of connection
        NetworkService.onNetworkAvailable().subscribe((results) => {
            this.isConnected = results;
            this.logger.debug(`isConnectedSearch => ${this.isConnected}`);
        });
        this.logger.debug(`isConnectedSearch => ${this.isConnected}`);
    }

    public showLoadingData(value: string) {
        let loader = this.loadingCtrl.create( {
            content: "Searching for " + value,
            duration: 3000
        });
        loader.present();
    }
}

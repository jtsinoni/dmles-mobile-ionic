import {Input, NgZone} from "@angular/core";
import {LoadingController, Loading} from 'ionic-angular';
import {NetworkService} from "../../services/network.service";
import {AppInjector} from "../../app.module";
import {UtilService} from "../../common/services/util.service";

export class Search {
    @Input()
    public isConnected: boolean;

    @Input()
    public searchValue: string;
    public networkService: NetworkService;
    protected utilService: UtilService;
    private ngZone: NgZone;
    private loader: Loading;

    constructor (public loadingCtrl: LoadingController) {
        this.init();
    }

    private init(){
        this.searchValue = '';

        this.networkService = AppInjector.get(NetworkService);
        this.ngZone = AppInjector.get(NgZone);
        this.utilService = AppInjector.get(UtilService);

        // get initial state of connection
        this.isConnected = this.networkService.isConnected;

        this.networkService.onNetworkAvailable().subscribe((available: boolean) => {
            if(available) {
                this.ngZone.run(() => {
                    this.isConnected = true;
                });
            } else {
                this.ngZone.run(() => {
                    this.isConnected = false;
                });
            }
        });
    }

    public showLoadingData(args: any) {
        let params = {content: args.content} as any;

        if(args.duration) {
            params.duration = args.duration;
        }

        this.loader = this.loadingCtrl.create(params);
        this.loader.present();
    }

    public loadingEnded() {
        this.loader.dismiss();
    }
}

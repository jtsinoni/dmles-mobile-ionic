import {Component, Input} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';

import {RoleDetailsComponent} from './details/role-details.component';
import {RoleService} from "../../../common/endpoints/role.service";
import {LoggerService} from "../../../services/logger/logger-service";
import {HostServerService} from "../../../services/host-server.service";
import {ServerModel} from "../../../models/server.model";
import {ModalDialogController} from "../../common/dialogs/modal-dialog-controller.component";
import {WarningDialogComponent} from "../../common/dialogs/warning-dialog.component";
import {UtilService} from "../../../common/services/util.service";
import {AppInjector} from "../../../app.module";

@Component({
    templateUrl: './roles.component.html'}
)
export class RolesComponent {
    private utilService: UtilService;
    private loader: Loading;

    selectedItem: any;

    @Input()
    items: Array<any>;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private RoleService: RoleService,
                private log: LoggerService,
                private hostServerService: HostServerService,
                private loadingCtrl: LoadingController) {
        this.utilService = AppInjector.get(UtilService);
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        this.getAllRoles();
    }

    private getAllRoles() {
        let server: ServerModel;
        this.hostServerService.getDefaultServer().then(s => server = s).then(() => {
            this.showLoadingData({content: `Getting Roles`});

            this.RoleService.setServer(server);
            this.RoleService.getAllRoles()
                .timeout(8000)
                .map((response) => {
                    return this.utilService.getPayload(response);
                })
                .subscribe((results) => {
                    this.items = results;
                    this.log.debug(`getAllRoles => ${JSON.stringify(results)}`);
                    this.loadingEnded();
                },
                (error) => {
                    this.loadingEnded();
                    this.log.debug(`Error => ${error}`);

                    let dialog = new ModalDialogController(WarningDialogComponent);
                    dialog.show({message: `Error retrieving roles.`, error: error});
                });
        });
    }

    private showLoadingData(args: any) {
        let params = {content: args.content} as any;

        if(args.duration) {
            params.duration = args.duration;
        }

        this.loader = this.loadingCtrl.create(params);
        this.loader.present();
    }

    private loadingEnded() {
        this.loader.dismiss();
    }

    itemTapped(event, item) {
        this.navCtrl.push(RoleDetailsComponent, {
            item: item
        });
    }
}

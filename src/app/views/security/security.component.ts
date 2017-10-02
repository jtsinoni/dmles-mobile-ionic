import { Component } from '@angular/core';

import {NavController} from 'ionic-angular';
import {LoginModalService} from "../../services/login-modal.service";
import { AuthenticationService } from '../../services/authentication.service';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
    selector: 'security',
    templateUrl: './security.html'
})
export class SecurityComponent {
    constructor(public navCtrl: NavController,
                private loginModalService: LoginModalService,
                private authService: AuthenticationService) {
        // If logged in, show area Logout, remove area Logout when logging out
        this.authService.onLoggedIn().subscribe((loggedIn: boolean) => {
            if(loggedIn) {
                this.navCtrl.setRoot(ScannerComponent, {isLoggedIn:true});
            } 
        });                     
    }

    startApp() {
        this.loginModalService.presentModal();
    }
}

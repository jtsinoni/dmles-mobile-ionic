import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from "../../../services/logger/logger-service";
import { ViewController, AlertController } from "ionic-angular";
import { ServerModel } from "../../../models/server.model";

import { HostServerService } from "../../../services/host-server.service";


@Component({
  selector: 'add-server',
  templateUrl: 'add-server.component.html'
})
export class AddServerComponent {
  model: ServerModel = new ServerModel("");
  addServerForm: FormGroup;

  serverModels: Array<ServerModel>;

  constructor(
    private serverService: HostServerService,
    private formBuilder: FormBuilder,
    private log: LoggerService,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController) {
    this.addServerForm = formBuilder.group({
      'nameInput': ['', Validators.required],
      'portInput': ['', Validators.nullValidator],
      'protocolInput': ['http', Validators.nullValidator],   
      'defaultServerCheck' : ['true', Validators.nullValidator]  
    });

  }


  ionViewWillEnter() {
    this.getAllServers();

  }

  getAllServers() {
    this.serverService.getAll().then((s) => {
      this.serverModels = s;
      if (s) {
        this.log.debug(`Got => ${s.length} from IndexedDB`)
      }
    })
      .catch((error) => {
        this.log.error(error);
      });


  }


  saveHostServer() {
    if (this.validate()) {

      this.serverService.addHostServer(this.model);

      this.dismiss();
    }

  }

  validate(): boolean {
    if (this.addServerForm.valid) {
      return true;
    }
    let errorMessage = "<ul>";
    let name = this.addServerForm.controls['nameInput'];
    //let port = this.addServerForm.controls['portInput'];
    // let protocol = this.addServerForm.controls['protocolInput'];
    // if (!protocol.valid) {
    //   errorMessage += "<li>Protocol must be selected</li>"
    // }

    if (!name.valid) {
      errorMessage += "<li>Host Server required</li>"
    }

    // if (!port.valid) {
    //   errorMessage += "<li>Port is required</li>"
    // }

    errorMessage += "</ul>"

    let alert = this.alertCtrl.create({
      title: "Error",
      message: errorMessage,
      buttons: ['Ok']


    });
    alert.present();

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }



}

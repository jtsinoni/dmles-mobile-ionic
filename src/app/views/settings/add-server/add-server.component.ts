import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from "../../../services/logger/logger-service";
import { ViewController } from "ionic-angular";
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
    private viewCtrl: ViewController) {
    this.addServerForm = formBuilder.group({
      nameInput: ['', Validators.required],
      portInput: ['', Validators.required],
      defaultServerCheck: ['', Validators.required]
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
    this.serverService.add(this.model).then(() => {
    }).catch((error) => {
      this.log.error(error);
    });
    this.dismiss();

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setDefault(server: ServerModel) {
    this.serverService.setDefaultServer(server);
  }


}

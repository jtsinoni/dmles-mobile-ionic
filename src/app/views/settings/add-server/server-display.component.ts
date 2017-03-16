import { Component, OnInit, Input } from '@angular/core';
import { ServerModel } from "../../../models/server.model";
import { HostServerService } from "../../../services/host-server.service";
import { LoggerService } from "../../../services/logger/logger-service";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'server-display',
  templateUrl: './server-display.component.html'

})

export class ServerDisplayComponent implements OnInit {
  //server: ServerModel = new ServerModel("");

  defaultServerFilter = { defaultServer: true };

  hostGroup: string;


  @Input() servers: Array<ServerModel>;

  constructor(private hostServerService: HostServerService, private log: LoggerService, private viewCtrl: ViewController) {

  }

  ngOnInit() {

    this.hostServerService.getAll().then((s) => {
      this.servers = s;
    }).catch((error) => {
      this.log.error(error);
    });
  }

  deleteServer(server: ServerModel) {
    this.hostServerService.delete(server).then(() => {
      this.ngOnInit();
    });
  }

  setDefault(server: ServerModel) {
    if (server.isDefault) {
      this.log.debug("setting " + server.serverName + " to default");      
      this.hostServerService.setDefaultServer(server);
      this.viewCtrl.dismiss();
    } else {
      //do nothing user needs to set another or there is only one
      //this.log.debug("UN-setting " + server.serverName + " to default");
    }
  }

}
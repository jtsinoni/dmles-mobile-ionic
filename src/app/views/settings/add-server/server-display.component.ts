import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerModel } from "../../../models/server.model";
import { HostServerService } from "../../../services/host-server.service";
import { LoggerService } from "../../../services/logger/logger-service";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'server-display',
  templateUrl: './server-display.component.html'

})

export class ServerDisplayComponent implements OnInit {
  

  defaultServerFilter = { defaultServer: true };

  hostGroup: string;


  @Input() servers: Array<ServerModel>;

  @Output() notify: EventEmitter<ServerModel> = new EventEmitter<ServerModel>();

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

  updateServer(server: ServerModel) {
    this.notify.emit(server);
  }

  // setDefault(server: ServerModel) {
    
  //   this.log.debug("setting " + server.serverName + " to default");
  //   this.hostServerService.setDefaultServer(server);      
        
  //   this.viewCtrl.dismiss(); 
  //   this.ngOnInit();     
  // }

  // showHideSecureProtocol(serverModel: ServerModel, protocol: string) {
  //   this.log.debug("what is server: " + serverModel.serverName + " " + serverModel.protocol);    
  //   if (protocol != serverModel.protocol) {      
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}
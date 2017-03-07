import { Component, OnInit, Input } from '@angular/core';
import { ServerModel } from "../../../models/server.model";
import { HostServerService } from "../../../services/host-server.service";
import { LoggerService } from "../../../services/logger/logger-service";

@Component({
  selector: 'server-display',
  templateUrl: './server-display.component.html'

})

export class ServerDisplayComponent implements OnInit {
  //server: ServerModel = new ServerModel("");

  defaultServerFilter = { defaultServer: true };

  hostGroup: string;

  @Input() servers: Array<ServerModel>;

  constructor(private hostServerService: HostServerService, private log: LoggerService) {
  }

  ngOnInit() {
    
    this.hostServerService.getAll().then((s) => {
      this.servers = s;

    }).catch((error) => {
      this.log.error(error);
    });
  }

  deleteServer(server: ServerModel) {
    this.hostServerService.delete(server);
    //this.ngOnInit();
  }
  
}
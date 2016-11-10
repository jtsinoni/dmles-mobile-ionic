/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Input} from "@angular/core";
import {DatabaseService} from "../../services/database.service";
import {FactoryUpstreamService} from "../../services/upstream/factory-upstream.service";
import {UpstreamService} from '../../services/upstream/upstream.service';
import {MQTTModel} from "../../models/mqtt.model";
@Component({
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    @Input()
    public data: MQTTModel;

    private upstreamService: UpstreamService;

    constructor(private databaseService: DatabaseService) {
        this.data = databaseService.data;
        this.upstreamService = FactoryUpstreamService.createService("topic");
    }


    public connect() {
        console.log("Received connect event");
        this.upstreamService.sendData("Message 1");
    }

    public disconnect() {
        console.log("Received disconnect event");
    }
}



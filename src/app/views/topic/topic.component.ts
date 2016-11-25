/**
 * Created by johntsinonis on 11/9/16.
 */
import {Component, Input, OnInit} from "@angular/core";
import {DatabaseService} from "../../services/database.service";
import {UpstreamService} from '../../services/upstream/upstream.service';
import {CommonDataModel} from "../../models/common-data.model";
import {TopicMessagingService} from "../../services/topic-messaging.service";
import {CommonDataService} from "../../services/common-data.service";
import {DataTableModel} from "../../models/data-table.model";

@Component({
    templateUrl: 'topic.component.html',
})
export class TopicComponent implements OnInit {

    @Input()
    public data: CommonDataModel;

    // Init to empty array
    public items: DataTableModel[] = [];

    // Default toolbar start page
    // TODO: should be setup in a defaults file or some other persistence mechanism
    public page: string = "start";

    //private upstreamService: UpstreamService;

    constructor(private databaseService: DatabaseService, private upstreamService: UpstreamService,
                private topicMessagingService: TopicMessagingService, private commonDataService: CommonDataService) {
        this.data = commonDataService.data;
        topicMessagingService.connect('localhost', 61616);
    }

    private updateCount() {
        this.databaseService.count()
            .then(count => {
                this.data.badgeCount = count;
            }).catch(console.log.bind(console));
    }

    ngOnInit(): void {
        this.updateCount();
    }

    public connect() {
        console.log("Received connect event");
        this.upstreamService.sendData("Message 1");
    }

    public disconnect() {
        console.log("Received disconnect event");
        //this.upstreamService.disc;
    }

    public add(data: string) {
        console.log("Add data to database ...");
        this.databaseService.add(data)
            .then(()=> {
                this.updateCount();
            }).catch(console.log.bind(console));
    }

    public delete(id?: number) {
        console.log(`Deleting record with ${id} ...`);
        this.databaseService.delete(id);
    }

    public find(data?: string) {
        console.log(`Finding data ${data} ...`);
        this.databaseService.find(data)
            .then(data => {
                this.items = data;
            }).catch(console.log.bind(console));
    }

    public itemTapped(event, item) {
        console.log(`Event: ${event} Item: ${item.data}`);
        // this.navCtrl.push(ItemDetailsPage, {
        //   item: item
        // });
    }

}



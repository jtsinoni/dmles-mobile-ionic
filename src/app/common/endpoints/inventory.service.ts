import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { ApiService } from "../../services/api.service";
import { AuthenticationService } from "../../services/authentication.service";
import { AppService } from "../../services/app.service";
import { LoggerService } from "../../services/logger/logger-service";
import {StorageLocationModel} from "../../models/inventory/storage/storage-location.model";
import {StorageRecordModel} from "../../models/inventory/record/storage-record.model";
import {InventoryRecordSummaryModel} from "../../models/inventory/record/inventory-record-summary.model";
import {InventoryStorageDetailModel} from "../../models/inventory/record/inventory-storage-detail.model";
import {LocationTypeModel} from "../../models/inventory/storage/location-type.model";

@Injectable()
export class InventoryService extends ApiService {
    public serviceName: string = "Inventory Service";

    constructor(http: Http,
        public log: LoggerService,
        protected authenticationService: AuthenticationService,
        private app: AppService) {

        super(http, log, authenticationService, app, "Inventory");
        this.log.debug(`${this.serviceName} - Start`);
    }


    /************************************************
     //
     // Functions used for Inventory Management
     //
     *************************************************/
    // BT service calls records
    public getInventoryRecordByID(inventoryRecordId: string): Observable<StorageRecordModel> {
        return this.get(`getInventoryRecordByID?inventoryRecordId=${inventoryRecordId}`);
    }

    public getInventoryRecords(ownerId: String): Observable<InventoryRecordSummaryModel[]> {
        return this.get(`getInventoryRecordSummariesByOwnerId?ownerOrgNodeId=${ownerId}`);
    }

    public getStorageDetails(inventoryRecordId: string): Observable<InventoryStorageDetailModel[]> {
        return this.get(`getInventoryStorageDetails?inventoryRecordId=${inventoryRecordId}`);
    }

    // BT service calls storage
    public getStorageLocationsByOwnerId(ownerId: String): Observable<StorageLocationModel[]> {
        this.log.info(`${this.serviceName} - invoking BT endpoint storageLocation/getStorageLocationsByOwnerId for ${ownerId}`);

        return this.get(`getStorageLocationsByOwnerId?ownerOrgNodeId=${ownerId}`);
    }

    public getStorageLocationTypes(): Observable<LocationTypeModel[]> {
        return this.get("getLocationTypes");
    }

    public addStorageLocation(loc:StorageLocationModel): Observable<StorageLocationModel> {
        this.log.info("Invoking BT endpoint storageLocation/add");

        return this.post("createStorageLocation", loc);

    }

    public updateStorageLocation(loc:StorageLocationModel): Observable<StorageLocationModel> {
        this.log.info("Invoking BT endpoint storageLocation/update");

        return this.post("updateStorageLocation", loc);

    }

}

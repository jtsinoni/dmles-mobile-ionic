import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Logger} from "angular2-logger/core";
import {Observable} from "rxjs";

import {ApiService} from "../../services/api.service";
import {AppService} from "../../services/app.service";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class RequestApiService extends ApiService {

    constructor(http: Http,
                public log: Logger,
                protected authenticationService: AuthenticationService,
                private app: AppService) {
        super(http, log, authenticationService, app, "EquipmentManagement");
    }

    public buildWeighIns(requestId){
        return this.get('request/buildWeighins?requestId=' + requestId);
    }

    public getEquipmentRequests(): Observable<any> {
        return this.get("getEquipmentRequests");
    }

    public getCriticalityCodes(service) {
        return this.get('getCriticalCodes?serviceAgency=' + service);
    }

    public getDevices(){
        return this.get('getDevices');
    }

    public getEquipmentRequest(id) {
        return this.get("getEquipmentRequest?id=" + id);
    }

    public getEquipmentRequestReasons() {
        return this.get("getEquipmentRequestReasons");
    };

    public getEquipmentRequestTypes() {
        return this.get("getEquipmentRequestTypes");
    };

    public getLiteratureTypes(){
        return this.get('getLiteratureTypes');
    }

    public getManufacturers(){
        return this.get('getEquipmentManufacturers');
    }

    public getMountingTypes(){
        return this.get('getEquipmentMountingTypes');
    }

    public getLevelsCriteriaNeeded(request){
        return this.post("getLevelsCriteriaNeeded", request);
    }

    public getRequestsByCustodianId(userId,active){
        return this.get("getRequestsByCustodianId?userId=" + userId+"&active="+active);
    }

    public getRequestsByRequestStatus(status){
        return this.get("getRequestsByRequestStatus?status=" + status);
    }

    public getTraineeTypes(){
        return this.get("getEquipmentTraineeTypes");
    }

    public getTrainingLocations(){
        return this.get("getTraineeLocationTypes");
    }

    public getWeighInResults(){
        return this.get("request/getWeighInResults");
    }

    public saveEquipmentRequest(equipmentRequest) {
    return this.post("request/save", equipmentRequest);
}

    public saveFacilities(equipmentRequest) {
        return this.post("request/saveFacilities", equipmentRequest);
    }

    public saveMaintenance(equipmentRequest) {
        return this.post("request/saveMaintenance", equipmentRequest);
    }

    public saveRequestCustomerInfo(equipmentRequest) {
        return this.post("request/saveRequestCustomerInfo", equipmentRequest);
    }

    public saveRequestEquipmentInfo(equipmentRequest) {
        return this.post("request/saveRequestEquipmentInfo", equipmentRequest);
    }

    public saveRequestExtraItems(equipmentRequest) {
        return this.post("request/saveRequestExtraItems", equipmentRequest);
    }

    public saveRequestInfo(equipmentRequest) {
        return this.post("request/saveRequestInfo", equipmentRequest);
    }

    public saveRequestSourceOfSupply(equipmentRequest) {
        return this.post("request/saveRequestSourceOfSupply", equipmentRequest);
    }

    public saveRequestTraining(equipmentRequest) {
        return this.post("request/saveRequestTraining", equipmentRequest);
    }

    public saveSafety(equipmentRequest) {
        return this.post("request/saveSafety", equipmentRequest);
    }

    public saveTechnology(equipmentRequest) {
        return this.post("request/saveTechnology", equipmentRequest);
    }

    public submitForProcessing(request) {
        return this.post("request/submitForProcessing", request);
    }

    /********* Comments **********/

    public addProcessComment(requestId, comment){
        return this.get("request/addProcessComment?requestId=" + requestId + "&comment=" + comment);
    }

    public addWeighInComment(requestId, weighInRole, comment){
        return this.get("request/addWeighInComment?requestId=" + requestId + "&weighInRole=" + weighInRole + "&comment=" + comment);
    }

    public removeProcessComment(requestId, commentId){
        return this.get("request/removeProcessComment?requestId=" + requestId + "&commentId=" + commentId);
    }

    public removeWeighInComment(requestId, weighInRole, commentId){
        return this.get("request/removeWeighInComment?requestId=" + requestId + "&weighInRole=" + weighInRole + "&commentId=" + commentId);
    }

    /********* Level Results **********/

    public approve(requestId){
        return this.get("request/approve?requestId=" + requestId);
    }

    public cancel(requestId){
        return this.get("request/cancel?requestId=" + requestId);
    }

    public forceUp(requestId){
        return this.get("request/forceUp?requestId=" + requestId);
    }

    public hold(requestId){
        return this.get("request/hold?requestId=" + requestId);
    }

    public reactivate(requestId){
        return this.get("request/reactivate?requestId=" + requestId);
    }

    public reject(requestId){
        return this.get("request/reject?requestId=" + requestId);
    }

    public retract(requestId){
        return this.get("request/retract?requestId=" + requestId);
    }

    public rework(requestId){
        return this.get("request/rework?requestId=" + requestId);
    }

    /******* Weigh In Results *******/

    public submitWeighinResult(weighInRole, result, request, weighInDisplayName) {
        return this.post("request/submitWeighinResult?requestId=" + request.id + "&weighInRole=" + weighInRole + "&result=" + result + "&weighInDisplayName=" + weighInDisplayName, request);
    }

    public submitWeighinStatus(request) {
        return this.post("request/submitWeighinStatus", request);
    }

    /******* Workflow Management *******/

    public getWorkflowDefinition(service){
        return this.get("request/workflowDefinition/getDefinition?service=" + service);
    }

    public updateWorkflowDefCostCriteria(serviceName, levelID, totalCost){
        return this.get("request/updateWorkflowDefCostCriteria?serviceName=" + serviceName + "&levelID=" + levelID + "&totalCost=" + totalCost);
    }
}

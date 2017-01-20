import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

import {ApiService} from "../../services/api.service";
import {AppService} from "../../services/app.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LoggerService} from "../../services/logger/logger-service";

import { Platform } from 'ionic-angular'; //mec... yoyo...


@Injectable()
export class RequestApiService extends ApiService {

    constructor(http: Http,
                public platform: Platform, //mec...
                public log: LoggerService,
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

    public getEquipmentRecords(): Observable<any> {
        //alert("mec...3");
        //const searchString = 'getEquipmentRecordSearchResults?searchValue=23209 (deleteInd:N)&aggregations={"aggregations": [{"name":"orgIds","field":"orgId","size":"300"},{"name":"nomenclatures","field":"deviceText.raw","size":"5000"}{"name":"manufacturers","field":"manufOrgName.raw","size":"5500"}{"name":"commonModels","field":"manufMdlComnId.raw","size":"5000"}{"name":"customerNames","field":"custOrgNM.raw","size":"5000"}{"name":"custOrgIds","field":"custOrgId","size":"5000"}{"name":"custodianNames","field":"custodianName.raw","size":"5000"}]}';
        //const searchString = 'getEquipmentRecordSearchResults?searchValue=23209%20(deleteInd%3AN)&aggregations=%7B%22aggregations%22%3A%20%5B%7B%22name%22%3A%22orgIds%22%2C%22field%22%3A%22orgId%22%2C%22size%22%3A%22300%22%7D%2C%7B%22name%22%3A%22nomenclatures%22%2C%22field%22%3A%22deviceText.raw%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22manufacturers%22%2C%22field%22%3A%22manufOrgName.raw%22%2C%22size%22%3A%225500%22%7D%7B%22name%22%3A%22commonModels%22%2C%22field%22%3A%22manufMdlComnId.raw%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22customerNames%22%2C%22field%22%3A%22custOrgNM.raw%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22custOrgIds%22%2C%22field%22%3A%22custOrgId%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22custodianNames%22%2C%22field%22%3A%22custodianName.raw%22%2C%22size%22%3A%225000%22%7D%5D%7D';
        //const searchString = 'getEquipmentRecord?dodaac=W33DME&meId=29306'; //mec... "getEquipmentRecords");
        //const searchString = 'getEquipmentRecordSearchResults?searchValue=1234%20(deleteInd%3AN)&aggregations=%7B%22aggregations%22%3A%20%5B%7B%22name%22%3A%22orgIds%22%2C%22field%22%3A%22orgId%22%2C%22size%22%3A%22300%22%7D%2C%7B%22name%22%3A%22nomenclatures%22%2C%22field%22%3A%22deviceText.raw%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22manufacturers%22%2C%22field%22%3A%22manufOrgName.raw%22%2C%22size%22%3A%225500%22%7D%7B%22name%22%3A%22commonModels%22%2C%22field%22%3A%22manufMdlComnId.raw%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22customerNames%22%2C%22field%22%3A%22custOrgNM.raw%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22custOrgIds%22%2C%22field%22%3A%22custOrgId%22%2C%22size%22%3A%225000%22%7D%7B%22name%22%3A%22custodianNames%22%2C%22field%22%3A%22custodianName.raw%22%2C%22size%22%3A%225000%22%7D%5D%7D';
        const searchString = 'getEquipmentRecordSearchResults?searchValue=123 (deleteInd%3AN)';
        alert("mec...3 with (" + searchString + ")");

        var step;
        for (step = 0; step < this.platform.platforms().length; step++) {

            var message =
                "mec... yoyo... platform (" + step + ") (" + this.platform.platforms()[step] +
                ") CORE(" + this.platform.is('core') + ")" +
                ") iOS(" + this.platform.is('ios') + ")" +
                ") android(" + this.platform.is('android') + ")" +
                ") Windows(" + this.platform.is('windows') + ")" +
                ") Mobile(" + this.platform.is('mobile') + ")" +
                ") MobileWeb(" + this.platform.is('mobileweb') + ")" +
                "";
            console.log(message);
        }


        //alert("mec... yoyo... CLOSE!");
        //window.close();

        return this.get(searchString); //mec...
        //mec... return this.get("getEquipmentRecord?dodaac=W33DME&meId=29306"); //mec... "getEquipmentRecords");
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

import { Injectable } from '@angular/core';

import { IssueModel } from '../../models/issue.model';
import { LoggerService } from "../logger/logger-service";
import { InMemoryDataService } from './in-memory-data-service';

/*
  Generated class for the IssueService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IssueService extends InMemoryDataService<IssueModel, string> {

  constructor(private log: LoggerService) {
    super();
    this.createData();

  }

  private createData() {
    this.data = [
      { id: 'W560JL6062J011', documentNumber: 'W560JL6062J011', itemId: '00 2500 1', issueDate: new Date().toJSON(), issueState: 1, quantityIssued: 6, requestor: 'Billy' },
      { id: 'W560JL6060J012', documentNumber: 'W560JL6060J012', itemId: '00 876 980 01', issueDate: new Date().toJSON(), issueState: 1, quantityIssued: 2, requestor: 'Ted' }
    ];
  }

  getAllIssues(): Promise<Array<IssueModel>> {
    return this.getMany();
  }

  getIssue(id: string) {
    this.log.log('calling getIssue from issue service');
    return this.getOne(id);
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiService } from './api-service';

import { IssueModel } from '../../models/issue.model';

/*
  Generated class for the IssueService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class IssueService extends ApiService<IssueModel, string> {

  constructor(public http: Http) {

    super(http, 'supply/issues');
  }

  getAllIssues(): Promise<Array<IssueModel>> {
    return this.getMany();
  }

  getIssue(id: string) {
    return this.getOne(id);
  }

}

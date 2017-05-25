import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { IssueModel } from '../../models/issue.model';
import { LoggerService } from "../logger/logger-service";
import { BaseDatabaseService } from '../../services/base-database.service';
import { DatabaseTableModelService } from '../database-table-model.service';


@Injectable()
export class IssueService extends BaseDatabaseService<IssueModel> {
   // Demo data file location
  assetFilename: string = "issues.json";
  assetDirectory: string = "assets/files";


  constructor(databaseService: DatabaseTableModelService,
    private http: Http,
    log: LoggerService) {
      // TODO store in db ? inject table : null
    super('Issue Service', null, log);

  }

  getAllIssues() {
     this.log.debug('in get all supply items');
    let url: string = this.assetDirectory + '/' + this.assetFilename;
    return this.http.get(url);
    //return this.getAll();
  }

  getIssue(id: string) {
    this.log.log('calling getIssue from issue service');
    //TODO fix
    //return this.get(id);
  }

}

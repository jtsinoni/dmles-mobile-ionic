import { Component } from '@angular/core';

import { NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

import { IssueModel } from '../../../models/issue.model';

import { IssueService } from '../../../services/supply/issue-service';
import {LoggerService} from "../../../services/logger/logger-service";

@Component({
  selector: 'page-issues',
  templateUrl: './issues.component.html'
})
export class IssuesComponent {

public issuesList: Array<IssueModel>;

   constructor(public navCtrl: NavController,
    navParams: NavParams,
    public issueService: IssueService,
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    private log: LoggerService) {

  }

   ionViewWillEnter() {
    this.getIssues();

  }

  getIssues() {
    this.issueService.getAllIssues().then(issues => this.issuesList = issues);

  }

    issueSelected($event, issue) {
    let options = this.actionSheetController.create({
      buttons: [
        {
          text: 'Show Detail',
          role: 'all',
          handler: () => {
            //todo show detail
          }
        },
        {
          text: 'Approve',
          role: 'approval',
          handler: () => {
            //todo --- got no idea...something or something else...
          }
        },
        {
          text: 'Close',
          role: 'close',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            this.log.info('Close clicked');
          }
        }
      ]
    });
    options.present();

  }






}

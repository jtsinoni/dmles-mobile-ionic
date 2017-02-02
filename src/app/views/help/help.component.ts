import { Component } from '@angular/core';

/*
  Generated class for the Help component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'help',
  templateUrl: './help.component.html'
})
export class HelpComponent {
  helpText: string;
  constructor() {
     this.helpText = "Help I'm a rock";
  }

}

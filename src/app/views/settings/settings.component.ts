import { Component } from '@angular/core';

/*
  Generated class for the Settings component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  text: string;

  constructor() {
    this.text = 'My Settings';
  }

}

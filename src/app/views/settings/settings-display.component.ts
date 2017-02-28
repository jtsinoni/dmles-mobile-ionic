import { Component, Input } from '@angular/core';
import { SettingsModel } from "../../models/settings.model";

@Component({
  selector: 'settings-display',
  templateUrl: './settings-display.component.html'

})

export class SettingsDisplayComponent {
  @Input() setting: SettingsModel;
  @Input() title: string;

  constructor() {

  }

  isHidden(item: SettingsModel, datatype: string) {
    if (datatype != item.dataType) {
      return true;
    } else {
      return false;
    }

  }

}
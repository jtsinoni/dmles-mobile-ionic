import { Component } from '@angular/core';
import { SettingsModel } from "../../../models/settings.model";
import { SettingsService } from "../../../services/settings.service"
import { LoggerService } from "../../../services/logger/logger-service";
import { ViewController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'add-setting',
  templateUrl: './add-setting.component.html'
})
export class AddSettingComponent {

  model: SettingsModel = new SettingsModel("", "", "");
  addSettingForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private log: LoggerService,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
    this.addSettingForm = formBuilder.group({
      nameInput: ['', Validators.required],
      valueInput: ['', Validators.required],
      dataTypeInput: ['', Validators.required]
    });

  }

  saveSetting() {
    this.settingsService.add(this.model).then(() => {  
      this.dismiss(this.model);

    }).catch((error) => {
      this.log.error(error);
    });
    

  }

  dismiss(model?: SettingsModel) {
    this.viewCtrl.dismiss(model);
  }

}

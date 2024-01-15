import { Component } from '@angular/core';
import { AutoCompleteComponent } from '../auto-complete/auto-complete.component';
import { DateControlComponent } from '../date-control/date-control.component';
import { InputControlComponent } from '../input-control/input-control.component';
import { NumberControlComponent } from '../number-control/number-control.component';
import { BaseControlComponent } from '../base-control.component';
import { FieldErrorMessageComponent } from "./field-error-message/field-error-message.component";
import { MaterialModule } from '../../../external-modules/material-module';

@Component({
    selector: 'app-field-control',
    standalone: true,
    templateUrl: './field-control.component.html',
    imports: [MaterialModule, NumberControlComponent, AutoCompleteComponent, InputControlComponent, DateControlComponent, FieldErrorMessageComponent]
})
export class FieldControlComponent extends BaseControlComponent {

  onSearch(value: any): void {
    this.search.emit(value);
  }
}

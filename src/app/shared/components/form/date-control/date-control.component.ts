import { Component } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../external-modules/material-module';

@Component({
    selector: 'app-date-control',
    standalone: true,
    templateUrl: './date-control.component.html',
    imports: [MaterialModule, ReactiveFormsModule]
})
export class DateControlComponent extends BaseControlComponent {

}

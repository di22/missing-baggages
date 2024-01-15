import { Component } from '@angular/core';
import { BaseControlComponent } from '../base-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../external-modules/material-module';

@Component({
    selector: 'app-input-control',
    standalone: true,
    templateUrl: './input-control.component.html',
    imports: [MaterialModule, ReactiveFormsModule]
})
export class InputControlComponent extends BaseControlComponent {

}

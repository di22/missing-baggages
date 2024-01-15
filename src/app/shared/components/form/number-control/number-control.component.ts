import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputControlComponent } from '../input-control/input-control.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../external-modules/material-module';

@Component({
    selector: 'app-number-control',
    standalone: true,
    templateUrl: './number-control.component.html',
    imports: [MaterialModule, ReactiveFormsModule, CommonModule]
})
export class NumberControlComponent extends InputControlComponent {

}

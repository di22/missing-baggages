import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MaterialModule } from '../../../../external-modules/material-module';

@Component({
  selector: 'app-field-error-message',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './field-error-message.component.html'
})
export class FieldErrorMessageComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() label: string;
}

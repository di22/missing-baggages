import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FieldTypes } from './form.config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base-control',
  standalone: true,
  imports: [],
  template: '',
})
export class BaseControlComponent {
    @Input() label: string;
    @Input() set control(control: AbstractControl | FormControl | null) {
      if(!control) this._control = new FormControl('');
      else this._control = control instanceof AbstractControl ? <FormControl>control : control;
    };
    @Input() type: FieldTypes;
    @Input() placeholder: string;
    @Input() customCSSClasses: string;
    @Input() id: string;
    @Input() error: string;
    @Input() list: Observable<string[]>;
    @Output() search: EventEmitter<string> = new EventEmitter<string>();
    _control: FormControl = new FormControl('');
}

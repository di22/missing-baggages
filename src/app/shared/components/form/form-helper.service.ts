import { Injectable } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if(control instanceof FormArray) {
        control.controls.forEach(c => {
          this.validateAllFormFields(c as FormGroup);
        });
      }
    });
  }
}
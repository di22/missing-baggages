import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    exports: [
      MatFormFieldModule,
       MatInputModule,
        MatNativeDateModule,
         MatDatepickerModule,
         MatAutocompleteModule,
         MatButtonModule,
         MatIconModule
    ],
    imports: [
      MatFormFieldModule,
       MatInputModule,
        MatNativeDateModule,
         MatDatepickerModule,
         MatAutocompleteModule,
         MatButtonModule,
         MatIconModule
    ]
  })
  export class MaterialModule { }
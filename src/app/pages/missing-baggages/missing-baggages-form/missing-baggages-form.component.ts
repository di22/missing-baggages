import { Component, EventEmitter, Output } from '@angular/core';
import { FieldControlComponent } from "../../../shared/components/form/field-control/field-control.component";
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaggageContentGroupItem, LostBaggageFormValue } from '../typed-forms';
import { MaterialModule } from '../../../shared/external-modules/material-module';
import { BaggagesCountComponent } from "./baggages-count/baggages-count.component";
import { FormHelperService } from '../../../shared/components/form/form-helper.service';
import { AirportService } from '../../../domain/country/airport.service';

@Component({
    selector: 'app-missing-baggages-form',
    standalone: true,
    templateUrl: './missing-baggages-form.component.html',
    styleUrl: './missing-baggages-form.component.scss',
    imports: [MaterialModule, ReactiveFormsModule, FieldControlComponent, BaggagesCountComponent]
})
export class MissingBaggagesFormComponent {
    @Output() addContents: EventEmitter<LostBaggageFormValue> = new EventEmitter();
    form: FormGroup;
    date: FormControl<Date>;
    origin: FormControl<string>;
    destination: FormControl<string>;
    code: FormControl<string>;
    baggagesCount: FormControl<number>;
    bagsContents: FormArray<FormGroup<BaggageContentGroupItem>>;
  
    originAirports: Observable<string[]>;
    destinationAirports: Observable<string[]>;
  
    constructor(private formBuilder: FormBuilder, private formHelperService: FormHelperService, private airportService: AirportService) {}
    
    ngOnInit(): void {
      this.initForm();
    }
  
    initForm(): void {
      this.form = this.formBuilder.group({
        date: ['', Validators.required],
        origin: ['', Validators.required],
        destination: ['', Validators.required],
        code: [''],
        baggagesCount: ['', Validators.required],
        bagsContents: this.formBuilder.array([])
      });
  
      this.date = <FormControl<Date>>this.form.get('date');
      this.origin = <FormControl<string>>this.form.get('origin');
      this.destination = <FormControl<string>>this.form.get('destination');
      this.code = <FormControl<string>>this.form.get('code');
      this.baggagesCount = <FormControl<number>>this.form.get('baggagesCount');
      this.bagsContents = <FormArray>this.form.get('bagsContents');
    }
  
    findOriginAirports(name: string): void {
      this.originAirports = this.airportService.getAirport(name);
    }
  
    findDestinationAirports(name: string): void {
      this.destinationAirports = this.airportService.getAirport(name);
    }
  
    addBaggageContentAndQuantity(): void {
      this.bagsContents.push(this.baggageContentAndQuantityForm)
    }
  
    removeBaggageContentAndQuantity(index: number): void {
      this.bagsContents.removeAt(index);
    }
  
    get baggageContentAndQuantityForm(): FormGroup {
      return this.formBuilder.group({
        contentName: [''],
        quantity: [],
        price: []
      })
    }
  
    submit(): void {
        if(this.form.valid){
           this.addContents.emit(this.form.value);
           this.resetForm();
          }
        else this.formHelperService.validateAllFormFields(this.form);
    }

    resetForm(): void {
      this.form.reset();
      this.bagsContents.clear();
      this.form.markAsUntouched();
    }
}

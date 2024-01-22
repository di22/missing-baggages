import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingBaggagesFormComponent } from './missing-baggages-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AirportService } from '../../../domain/airport/airport.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormHelperService } from '../../../shared/components/form/form-helper.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { BaggagesCountComponent } from './baggages-count/baggages-count.component';
import { fetchValue } from '../../../utils/unit-test.util';
import { DOCUMENT } from '@angular/common';

describe('MissingBaggagesFormComponent', () => {
  let component: MissingBaggagesFormComponent;
  let fixture: ComponentFixture<MissingBaggagesFormComponent>;
  let compiled: HTMLElement;
  let formHelperService: FormHelperService;
  let airportService: AirportService;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingBaggagesFormComponent, HttpClientModule, NoopAnimationsModule],
      providers: [AirportService, FormHelperService]
    })
    .compileComponents();

    formHelperService = TestBed.inject(FormHelperService);
    airportService = TestBed.inject(AirportService);
    document = TestBed.inject(DOCUMENT);
    fixture = TestBed.createComponent(MissingBaggagesFormComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form and its properties', () => {
    expect(component.form).toBeTruthy();
    expect(component.date).toBeTruthy();
    expect(component.code).toBeTruthy();
    expect(component.origin).toBeTruthy();
    expect(component.destination).toBeTruthy();
    expect(component.baggagesCount).toBeTruthy();
    expect(component.bagsContents).toBeTruthy();
  });

  it('should not contain baggages content subform', () => {
    const baggagesCount = compiled.querySelectorAll('app-baggages-count');
    expect(baggagesCount.length).toBe(0);
  });

  it('should fir form validations', () => {
    jest.spyOn(component, 'submit');
    jest.spyOn(formHelperService, 'validateAllFormFields');
    const submitButton = compiled.querySelector('[data-testid="submit"]') as HTMLButtonElement;
    submitButton.click();
    fixture.detectChanges();

    const errorMessages = compiled.querySelectorAll('mat-error');

    expect(component.submit).toHaveBeenCalled();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(errorMessages.length).toBe(4);
  });

  it('should add content details inputs', () => {
    jest.spyOn(component, 'addBaggageContentAndQuantity');

    const addButton = compiled.querySelector('[data-testid="add-content"]') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();

    const baggagesCount = compiled.querySelectorAll('app-baggages-count');
    let items = compiled.querySelectorAll('[data-testid="item"]')

    fixture.detectChanges();

    expect(baggagesCount.length).toBe(1);
    expect(items.length).toBe(1);

    addButton.click();
    fixture.detectChanges();

    items = compiled.querySelectorAll('[data-testid="item"]');
    expect(items.length).toBe(2);

    expect(component.addBaggageContentAndQuantity).toHaveBeenCalledTimes(2);
  });

  it('should remove content details inputs', () => {
    jest.spyOn(component, 'addBaggageContentAndQuantity');
    jest.spyOn(component, 'removeBaggageContentAndQuantity');
   
    const addButton = compiled.querySelector('[data-testid="add-content"]') as HTMLButtonElement;
    addButton.click();
    fixture.detectChanges();

    let baggagesCount = compiled.querySelectorAll('app-baggages-count');
    let items = compiled.querySelectorAll('[data-testid="item"]');

    fixture.detectChanges();

    expect(baggagesCount.length).toBe(1);
    expect(items.length).toBe(1);

    const contentComponent = fixture.debugElement.query(By.directive(BaggagesCountComponent));
    const removebButton = contentComponent.nativeElement.querySelector('[data-testid="remove-content"]') as HTMLButtonElement;
    removebButton.click();
    fixture.detectChanges();

    baggagesCount = compiled.querySelectorAll('app-baggages-count');
    items = compiled.querySelectorAll('[data-testid="item"]');

    expect(baggagesCount.length).toBe(0);
    expect(items.length).toBe(0);

    expect(component.addBaggageContentAndQuantity).toHaveBeenCalledTimes(1);
    expect(component.removeBaggageContentAndQuantity).toHaveBeenCalledTimes(1);
  });

  it('should submit the form', async() => {
    jest.spyOn(component, 'submit');
    jest.spyOn(component.addContents, 'emit');
    jest.spyOn(component, 'resetForm');
    jest.spyOn(airportService, 'getAirport').mockReturnValue(of(['Amsterdam airport', 'Cairo airport']));

    const date = fixture.debugElement.query(By.css('input[id="date"]'));
    fetchValue(date, '01/01/2024');

    const origin = fixture.debugElement.query(By.css('input[id="origin"]'));
    fetchValue(origin, 'a');
    await fixture.whenStable();
    fixture.detectChanges();
    const matOriginOptions = document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    expect(matOriginOptions.length).toEqual(2);
    matOriginOptions[0].click();
    expect(component.origin.value).toEqual('Amsterdam airport');

    const destination = fixture.debugElement.query(By.css('input[id="destination"]'));
    fetchValue(destination, 'b');
    await fixture.whenStable();
    fixture.detectChanges();
    const matDestinationOptions = document.querySelectorAll('mat-option')  as NodeListOf<HTMLElement>;
    expect(matDestinationOptions.length).toEqual(2);
    matDestinationOptions[1].click();
    expect(component.destination.value).toEqual('Cairo airport');

    const code = fixture.debugElement.query(By.css('input[id="code"]'));
    fetchValue(code, 'A1');

    const baggagesCount = fixture.debugElement.query(By.css('input[id="baggagesCount"]'));
    fetchValue(baggagesCount, '2');

    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();

    const submitButton = compiled.querySelector('[data-testid="submit"]') as HTMLButtonElement;
    submitButton.click();
    fixture.detectChanges();

    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(component.addContents.emit).toHaveBeenCalledTimes(1);
    expect(component.resetForm).toHaveBeenCalledTimes(1);

    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy();
  });
});

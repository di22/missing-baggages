import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingBaggagesFormComponent } from './missing-baggages-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AirportService } from '../../../domain/country/airport.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormHelperService } from '../../../shared/components/form/form-helper.service';

describe('MissingBaggagesFormComponent', () => {
  let component: MissingBaggagesFormComponent;
  let fixture: ComponentFixture<MissingBaggagesFormComponent>;
  let compiled: HTMLElement;
  let formHelperService: FormHelperService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingBaggagesFormComponent, HttpClientModule, NoopAnimationsModule],
      providers: [AirportService, FormHelperService]
    })
    .compileComponents();

    formHelperService = TestBed.inject(FormHelperService);
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
});

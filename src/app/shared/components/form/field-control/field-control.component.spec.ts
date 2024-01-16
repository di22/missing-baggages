import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldControlComponent } from './field-control.component';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FieldTypes } from '../form.config';
import { FieldErrorMessageComponent } from './field-error-message/field-error-message.component';

@Component({
  selector: 'app-test-coltrol-field',
  standalone: true,
  template: `
   <app-field-control [control]="control" id="test" [label]="lable" [type]="type"></app-field-control>

  `,
  imports: [FieldControlComponent]
})
export class TestFieldControlComponent {
control: FormControl = new FormControl('', Validators.required);
lable: string = 'Test';
type: FieldTypes = 'autocomplete';
}


describe('FieldControlComponent', () => {
  let component: TestFieldControlComponent;
  let fixture: ComponentFixture<TestFieldControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestFieldControlComponent, FieldControlComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestFieldControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show errors', () => {
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const errorComponentRef = fieldComponent.nativeElement.querySelector('app-field-error-message');
    expect(errorComponentRef).toBeTruthy();

    const errorComponent = fieldComponent.query(By.directive(FieldErrorMessageComponent));
    const error = errorComponent.nativeElement.querySelectorAll('mat-error');
    expect(error.length).toEqual(0);
  });

  it('should render autocomplete', () => {
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const autocompleteField = fieldComponent.nativeElement.querySelector('app-auto-complete');
    const inputField = fieldComponent.nativeElement.querySelector('app-input-control');
    const numberField = fieldComponent.nativeElement.querySelector('app-number-control');
    const dateField = fieldComponent.nativeElement.querySelector('app-date-control');

    expect(autocompleteField).toBeTruthy();
    expect(inputField).toBeFalsy();
    expect(numberField).toBeFalsy();
    expect(dateField).toBeFalsy();

    expect(component.control).toBeTruthy();
    expect(component.lable).toEqual(fieldComponent.componentInstance.label);
  });

  it('should render input', () => {
    component.type = 'text';
    fixture.detectChanges();
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const autocompleteField = fieldComponent.nativeElement.querySelector('app-auto-complete');
    const inputField = fieldComponent.nativeElement.querySelector('app-input-control');
    const numberField = fieldComponent.nativeElement.querySelector('app-number-control');
    const dateField = fieldComponent.nativeElement.querySelector('app-date-control');

    expect(autocompleteField).toBeFalsy();
    expect(inputField).toBeTruthy();
    expect(numberField).toBeFalsy();
    expect(dateField).toBeFalsy();

    expect(component.control).toBeTruthy();
    expect(component.lable).toEqual(fieldComponent.componentInstance.label);
  });

  it('should render number', () => {
    component.type = 'number';
    fixture.detectChanges();
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const autocompleteField = fieldComponent.nativeElement.querySelector('app-auto-complete');
    const inputField = fieldComponent.nativeElement.querySelector('app-input-control');
    const numberField = fieldComponent.nativeElement.querySelector('app-number-control');
    const dateField = fieldComponent.nativeElement.querySelector('app-date-control');

    expect(autocompleteField).toBeFalsy();
    expect(inputField).toBeFalsy();
    expect(numberField).toBeTruthy();
    expect(dateField).toBeFalsy();

    expect(component.control).toBeTruthy();
    expect(component.lable).toEqual(fieldComponent.componentInstance.label);
  });

  it('should render date', () => {
    component.type = 'date';
    fixture.detectChanges();
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const autocompleteField = fieldComponent.nativeElement.querySelector('app-auto-complete');
    const inputField = fieldComponent.nativeElement.querySelector('app-input-control');
    const numberField = fieldComponent.nativeElement.querySelector('app-number-control');
    const dateField = fieldComponent.nativeElement.querySelector('app-date-control');

    expect(autocompleteField).toBeFalsy();
    expect(inputField).toBeFalsy();
    expect(numberField).toBeFalsy();
    expect(dateField).toBeTruthy();

    expect(component.control).toBeTruthy();
    expect(component.lable).toEqual(fieldComponent.componentInstance.label);
  });

  it('should render nothing', () => {
    component.type = 'test' as any;
    fixture.detectChanges();
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const autocompleteField = fieldComponent.nativeElement.querySelector('app-auto-complete');
    const inputField = fieldComponent.nativeElement.querySelector('app-input-control');
    const numberField = fieldComponent.nativeElement.querySelector('app-number-control');
    const dateField = fieldComponent.nativeElement.querySelector('app-date-control');

    expect(autocompleteField).toBeFalsy();
    expect(inputField).toBeFalsy();
    expect(numberField).toBeFalsy();
    expect(dateField).toBeFalsy();

    expect(component.control).toBeTruthy();
    expect(component.lable).toEqual(fieldComponent.componentInstance.label);
  });

  it('should render nothing', () => {
    component.type = 'test' as any;
    fixture.detectChanges();
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const autocompleteField = fieldComponent.nativeElement.querySelector('app-auto-complete');
    const inputField = fieldComponent.nativeElement.querySelector('app-input-control');
    const numberField = fieldComponent.nativeElement.querySelector('app-number-control');
    const dateField = fieldComponent.nativeElement.querySelector('app-date-control');

    expect(autocompleteField).toBeFalsy();
    expect(inputField).toBeFalsy();
    expect(numberField).toBeFalsy();
    expect(dateField).toBeFalsy();

    expect(component.control).toBeTruthy();
    expect(component.lable).toEqual(fieldComponent.componentInstance.label);
  });

  it('should show required error', () => {
    component.control.markAsTouched();
    fixture.detectChanges();
    const fieldComponent = fixture.debugElement.query(By.directive(FieldControlComponent));
    const errorComponentRef = fieldComponent.nativeElement.querySelector('app-field-error-message');
    expect(errorComponentRef).toBeTruthy();

    const errorComponent = fieldComponent.query(By.directive(FieldErrorMessageComponent));
    const error = errorComponent.nativeElement.querySelectorAll('mat-error');
    expect(error.length).toEqual(1);
  });
});

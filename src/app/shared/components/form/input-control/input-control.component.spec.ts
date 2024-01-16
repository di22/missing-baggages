import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControlComponent } from './input-control.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fetchValue } from '../../../../../app/utils/unit-test.util';

@Component({
  selector: 'app-test-input',
  standalone: true,
  template: `
 <app-input-control [control]="control" [label]="label" [id]="id"></app-input-control>

`,
  imports: [InputControlComponent]
})
export class TestInputComponent {
control: FormControl = new FormControl('123', Validators.required);
id: string = 'test';
label: string = 'Test';
}

describe('InputControlComponent', () => {
  let component: TestInputComponent;
  let fixture: ComponentFixture<TestInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInputComponent, InputControlComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has input component', () => {
    const inputComponent = fixture.nativeElement.querySelector('app-input-control');
    expect(inputComponent).toBeTruthy();
  });

  it('should have control value', () => {
    const inputComponent = fixture.debugElement.query(By.directive(InputControlComponent));
    expect(inputComponent.componentInstance._control.value).toEqual('123');
  });

  it('should change control value', async() => {
    const inputComponent = fixture.debugElement.query(By.directive(InputControlComponent));
    const input = inputComponent.query(By.css('input[id="test"]'));
    fetchValue(input, '456');
    await fixture.whenStable();
    expect(inputComponent.componentInstance._control.value).toEqual('456');
  });
});

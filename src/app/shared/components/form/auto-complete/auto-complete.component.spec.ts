import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteComponent } from './auto-complete.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { fetchValue } from '../../../../utils/unit-test.util';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-test-autocomplete',
    standalone: true,
    template: `
   <app-auto-complete [control]="control" [label]="label" [list]="list$" [id]="id" (search)="onSearch($event)"></app-auto-complete>

  `,
    imports: [AutoCompleteComponent]
})
export class TestAutocompleteComponent {
control: FormControl = new FormControl('', Validators.required);
id: string = 'test';
label: string = 'Test';
list: string[] = ['Amsterdam airport', 'Cairo airport'];
list$: Observable<string[]> = of(this.list);
typedValue: string;

onSearch(value: string): void {
this.typedValue = value;
}
}

describe('AutoCompleteComponent', () => {
  let component: TestAutocompleteComponent;
  let fixture: ComponentFixture<TestAutocompleteComponent>;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestAutocompleteComponent, AutoCompleteComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    document = TestBed.inject(DOCUMENT);
    fixture = TestBed.createComponent(TestAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has autocomplete component', () => {
    const autocompleteComponent = fixture.nativeElement.querySelector('app-auto-complete');
    expect(autocompleteComponent).toBeTruthy();
  });

  it('should has autocomplete component with 2 options', async() => {
    const fieldComponent = fixture.debugElement.query(By.directive(AutoCompleteComponent));
    const input = fieldComponent.query(By.css('input[id="test"]'));
    fetchValue(input, 'a');
    await fixture.whenStable();
    const matOriginOptions = document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    expect(matOriginOptions.length).toEqual(2);
  });

  it('should emit the selected value', async() => {
    jest.spyOn(component, 'onSearch');
    const fieldComponent = fixture.debugElement.query(By.directive(AutoCompleteComponent));
    const input = fieldComponent.query(By.css('input[id="test"]'));
    fetchValue(input, 'a');
    await fixture.whenStable();
    fixture.detectChanges();
    const matOriginOptions = document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    expect(matOriginOptions.length).toEqual(2);
    matOriginOptions[0].click();
    await fixture.whenStable();
    expect(component.onSearch).toHaveBeenCalledWith(component.list[0]);
    expect(component.typedValue).toEqual(component.list[0]);
  });
});

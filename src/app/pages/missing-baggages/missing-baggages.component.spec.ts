import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingBaggagesComponent } from './missing-baggages.component';
import { HttpClientModule } from '@angular/common/http';
import { MissingBaggagesFormComponent } from './missing-baggages-form/missing-baggages-form.component';
import { GridClientSideComponent } from '../../shared/components/grid/grid-client-side/grid-client-side.component';
import { AirportService } from '../../domain/country/airport.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { fetchValue } from '../../utils/unit-test.util';
import { DOCUMENT } from '@angular/common';

describe('MissingBaggagesComponent', () => {
  let component: MissingBaggagesComponent;
  let fixture: ComponentFixture<MissingBaggagesComponent>;
  let compiled: HTMLElement;
  let airportService: AirportService;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingBaggagesComponent, MissingBaggagesFormComponent, GridClientSideComponent, HttpClientModule, NoopAnimationsModule],
      providers: [AirportService]
    })
    .compileComponents();

    airportService = TestBed.inject(AirportService);
    fixture = TestBed.createComponent(MissingBaggagesComponent);
    document = TestBed.inject(DOCUMENT);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty list', () => {
    expect(component.list.length).toBe(0);
  });

  it('should have default price 0', () => {
    const price = compiled.querySelector('[data-testid="price"]');
    expect(component.price()).toBe(0);
    expect(price?.textContent?.trim()).toBe('0');
  });

  it('should not render confirmation message', () => {
    const confirmationMessage = compiled.querySelector('[data-testid="confirmation-message"]');
    expect(confirmationMessage).toBeFalsy();
  });

  it('should render report form and grid', () => {
    const form = fixture.debugElement.query(By.css('app-missing-baggages-form'));
    const grid = fixture.debugElement.query(By.css('app-grid-client-side'));

    expect(form).toBeTruthy();
    expect(grid).toBeTruthy();
  });

  it('should submit and add to list', async() => {
    const formValue = {date: new Date('01/01/2024'), origin: 'Amsterdam airport', destination: 'Cairo airport', code: 'A1', baggagesCount: 2, bagsContents: []};
    const formComponent = fixture.debugElement.query(By.directive(MissingBaggagesFormComponent));
    jest.spyOn(component, 'submit');
    jest.spyOn(component, 'structItemsList');
    jest.spyOn(component, 'updateItemsPrice');

    jest.spyOn(formComponent.componentInstance, 'submit');
    jest.spyOn(formComponent.componentInstance.addContents, 'emit');
    jest.spyOn(formComponent.componentInstance, 'resetForm');
    jest.spyOn(airportService, 'getAirport').mockReturnValue(of(['Amsterdam airport', 'Cairo airport']));

    const date = formComponent.query(By.css('input[id="date"]'));
    fetchValue(date, '01/01/2024');

    const origin = formComponent.query(By.css('input[id="origin"]'));
    fetchValue(origin, 'a');
    await fixture.whenStable();
    fixture.detectChanges();
    const matOriginOptions = document.querySelectorAll('mat-option') as NodeListOf<HTMLElement>;
    expect(matOriginOptions.length).toEqual(2);
    matOriginOptions[0].click();
    expect(formComponent.componentInstance.origin.value).toEqual('Amsterdam airport');

    const destination = formComponent.query(By.css('input[id="destination"]'));
    fetchValue(destination, 'b');
    await fixture.whenStable();
    fixture.detectChanges();
    const matDestinationOptions = document.querySelectorAll('mat-option')  as NodeListOf<HTMLElement>;
    expect(matDestinationOptions.length).toEqual(2);
    matDestinationOptions[1].click();
    expect(formComponent.componentInstance.destination.value).toEqual('Cairo airport');

    const code = formComponent.query(By.css('input[id="code"]'));
    fetchValue(code, 'A1');

    const baggagesCount = formComponent.query(By.css('input[id="baggagesCount"]'));
    fetchValue(baggagesCount, '2');

    fixture.detectChanges();
    expect(formComponent.componentInstance.form.valid).toBeTruthy();

    const submitButton = formComponent.nativeElement.querySelector('[data-testid="submit"]') as HTMLButtonElement;
    submitButton.click();
    fixture.detectChanges();

    expect(formComponent.componentInstance.submit).toHaveBeenCalledTimes(1);
    expect(formComponent.componentInstance.addContents.emit).toHaveBeenCalledTimes(1);
    expect(formComponent.componentInstance.resetForm).toHaveBeenCalledTimes(1);

    fixture.detectChanges();

    expect(component.submit).toHaveBeenCalledWith(formValue);
    expect(component.structItemsList).toHaveBeenCalledWith(formValue);
    expect(component.updateItemsPrice).toHaveBeenCalledTimes(1);

    expect(component.list.length).toEqual(1);

    const confirmationMessage = compiled.querySelector('[data-testid="confirmation-message"]');
    expect(confirmationMessage).toBeTruthy();

    const price = compiled.querySelector('[data-testid="price"]');
    expect(component.price()).toBe(0);
    expect(price?.textContent?.trim()).toBe('0');
  });
});

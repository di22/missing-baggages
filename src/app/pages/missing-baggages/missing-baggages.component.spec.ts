import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingBaggagesComponent } from './missing-baggages.component';
import { HttpClientModule } from '@angular/common/http';
import { MissingBaggagesFormComponent } from './missing-baggages-form/missing-baggages-form.component';
import { GridClientSideComponent } from '../../shared/components/grid/grid-client-side/grid-client-side.component';
import { AirportService } from '../../domain/country/airport.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('MissingBaggagesComponent', () => {
  let component: MissingBaggagesComponent;
  let fixture: ComponentFixture<MissingBaggagesComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingBaggagesComponent, MissingBaggagesFormComponent, GridClientSideComponent, HttpClientModule, NoopAnimationsModule],
      providers: [AirportService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissingBaggagesComponent);
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
});

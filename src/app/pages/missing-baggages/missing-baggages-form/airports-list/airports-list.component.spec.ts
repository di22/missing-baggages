import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { FormHelperService } from '../../../../shared/components/form/form-helper.service';
import { AirportsListComponent } from './airports-list.component';
import { AirportsStore } from '../../../../store/airports.store';
import { AirportService } from '../../../../domain/airport/airport.service';
import { fetchValue } from '../../../../utils/unit-test.util';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AirporstListComponent', () => {
  let component: AirportsListComponent;
  let fixture: ComponentFixture<AirportsListComponent>;
  let compiled: HTMLElement;
  let formHelperService: FormHelperService;
  let airportService: AirportService;
  let document: Document;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirportsListComponent, HttpClientModule, NoopAnimationsModule],
      providers: [AirportService, AirportsStore, FormHelperService]
    })
    .compileComponents();

    formHelperService = TestBed.inject(FormHelperService);
    airportService = TestBed.inject(AirportService);
    document = TestBed.inject(DOCUMENT);
    fixture = TestBed.createComponent(AirportsListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call airport api', async() => {
    jest.spyOn(airportService, 'getAirport').mockReturnValue(of(['Amsterdam airport', 'Cairo airport']));
    jest.spyOn(component, 'findAirports');
    component.id = 'origin';
    fixture.detectChanges();

    const inputAutocompleteElement = fixture.debugElement.query(By.css('input[id="origin"]'));
    fetchValue(inputAutocompleteElement, 'a');
    
    await fixture.whenStable();
    fixture.detectChanges();

    const matOptions = document.querySelectorAll('mat-option');
    expect(matOptions.length).toBe(2);
    expect(component.findAirports).toHaveBeenCalled();
    expect(airportService.getAirport).toHaveBeenCalled();
  });
});

import { TestBed } from '@angular/core/testing';
import { AirportService } from './airport.service';
import { HttpClientModule } from '@angular/common/http';


describe('CountryService', () => {
  let service: AirportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AirportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

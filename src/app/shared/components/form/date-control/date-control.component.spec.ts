import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateControlComponent } from './date-control.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DateControlComponent', () => {
  let component: DateControlComponent;
  let fixture: ComponentFixture<DateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateControlComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberControlComponent } from './number-control.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NumberControlComponent', () => {
  let component: NumberControlComponent;
  let fixture: ComponentFixture<NumberControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberControlComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

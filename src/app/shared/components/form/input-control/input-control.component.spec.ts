import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControlComponent } from './input-control.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputControlComponent', () => {
  let component: InputControlComponent;
  let fixture: ComponentFixture<InputControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputControlComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

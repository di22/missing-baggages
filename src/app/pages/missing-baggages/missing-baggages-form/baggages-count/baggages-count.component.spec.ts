import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaggagesCountComponent } from './baggages-count.component';

describe('BaggagesCountComponent', () => {
  let component: BaggagesCountComponent;
  let fixture: ComponentFixture<BaggagesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaggagesCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaggagesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

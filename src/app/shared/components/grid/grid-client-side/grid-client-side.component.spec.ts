import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClientSideComponent } from './grid-client-side.component';

describe('GridClientSideComponent', () => {
  let component: GridClientSideComponent<any[]>;
  let fixture: ComponentFixture<GridClientSideComponent<any[]>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridClientSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridClientSideComponent<any[]>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

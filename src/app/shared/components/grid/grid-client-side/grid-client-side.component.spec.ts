import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClientSideComponent } from './grid-client-side.component';
import { Component } from '@angular/core';
import { LostBaggage } from 'src/app/domain/lost-baggages/models';
import { GridColumn } from '../table-config';
import { By } from '@angular/platform-browser';


@Component({
  selector: 'app-test-grid',
  standalone: true,
  template: `
  <app-grid-client-side class="mt-1" [columns]="columns" [dataSource]="list"></app-grid-client-side>
  `,
  imports: [GridClientSideComponent]
})
export class TestGridClienSideComponent {
list: LostBaggage[] = [{date: '01/01/2024', origin: 'Amsterdam airport', destination: 'Cairo airport', baggageCode: 'A1'}];
columns: GridColumn[] = [
  {name: 'Baggage Code', property: 'baggageCode'},
   {name: 'Date', property: 'date'},
    {name: 'Origin', property: 'origin'},
     {name: 'Destination', property: 'destination'},
     {name: 'Item name', property: 'contentName'},
     {name: 'Price', property: 'price'},
     {name: 'Quantity', property: 'quantity'}
    ];
}


describe('GridClientSideComponent', () => {
  let component: TestGridClienSideComponent;
  let fixture: ComponentFixture<TestGridClienSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestGridClienSideComponent, GridClientSideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestGridClienSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have columns', () => {
    const gridComponent = fixture.debugElement.query(By.directive(GridClientSideComponent));

    expect(gridComponent.componentInstance.columns).toEqual(component.columns);
  });

  it('should have list', () => {
    const gridComponent = fixture.debugElement.query(By.directive(GridClientSideComponent));

    expect(gridComponent.componentInstance.dataSource).toEqual(component.list);
  });

  it('should extract columns properties', () => {
    const gridComponent = fixture.debugElement.query(By.directive(GridClientSideComponent));

    expect(gridComponent.componentInstance.columnsProperties?.length).toEqual(component.columns.length);
  });

  it('should draw one row', () => {
    const gridComponent = fixture.debugElement.query(By.directive(GridClientSideComponent));
    fixture.detectChanges();
    fixture.whenStable().then(_ => {
      const rows = gridComponent.nativeElement.querySelector('tr[mat-row]');
      expect(rows?.length).toEqual(component.list.length);
    })

  });
});

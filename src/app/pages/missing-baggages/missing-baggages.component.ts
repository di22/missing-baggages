import { ChangeDetectionStrategy, Component, WritableSignal, signal } from '@angular/core';
import { MissingBaggagesFormComponent } from "./missing-baggages-form/missing-baggages-form.component";
import { GridClientSideComponent } from "../../shared/components/grid/grid-client-side/grid-client-side.component";
import { LostBaggageFormValue } from './typed-forms';
import { MaterialModule } from '../../shared/external-modules/material-module';
import { LostBaggage } from '../../domain/lost-baggages/models';
import { GridColumn } from '../../shared/components/grid/table-config';

@Component({
    selector: 'app-missing-baggages',
    standalone: true,
    templateUrl: './missing-baggages.component.html',
    styleUrl: './missing-baggages.component.scss',
    imports: [MaterialModule, MissingBaggagesFormComponent, GridClientSideComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissingBaggagesComponent {
  list: LostBaggage[] = [];
  columns: GridColumn[] = [
    {name: 'Baggage Code', property: 'baggageCode'},
     {name: 'Date', property: 'date'},
      {name: 'Origin', property: 'origin'},
       {name: 'Destination', property: 'destination'},
       {name: 'Item name', property: 'contentName'},
       {name: 'Price', property: 'price'},
       {name: 'Quantity', property: 'quantity'}
      ];

      price: WritableSignal<number> = signal(0);
      
  submit(value: LostBaggageFormValue): void {
    this.list = this.structItemsList(value);
    this.updateItemsPrice();
  }

  structItemsList(value: LostBaggageFormValue): LostBaggage[] {
    const contents = value.bagsContents;
    let itemsList: LostBaggage[] = [];
    if(contents?.length) {
      itemsList = contents.map(c => ({
        date: value.date.toDateString(),
      origin: value.origin,
      destination: value.destination,
      baggageCode: value.code,
      contentName: c.contentName,
      price: c.price,
      quantity: c.quantity
      }));
    } else {
      itemsList = [{
        date: value.date.toDateString(),
      origin: value.origin,
      destination: value.destination,
      baggageCode: value.code
      }]
    }

    return [...this.list, ...itemsList];
  }

  updateItemsPrice(): void {
    this.price.set(0);
    const price = this.list.reduce((acc, current) => {
      return acc += (current.price || 0)
    }, 0);
    this.price.set(price);
  }
}

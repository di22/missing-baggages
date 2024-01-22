import { Component, Input, inject } from '@angular/core';
import { FieldControlComponent } from "../../../../shared/components/form/field-control/field-control.component";
import { AirportsStore } from '../../../../store/airports.store';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'app-airports-list',
    standalone: true,
    template: `
    <app-field-control [control]="control" [id]="id" [label]="label" [list]="store.airports()" type="autocomplete" (search)="findAirports($event)"></app-field-control>
    `,
    providers: [AirportsStore],
    imports: [FieldControlComponent]
})
export class AirportsListComponent {
    @Input() control: FormControl | AbstractControl;
    @Input() label: string;
    @Input() id: string;
    readonly store = inject(AirportsStore);

    findAirports(name: string): void {
        this.store.loadByQuery(name);
      }
}

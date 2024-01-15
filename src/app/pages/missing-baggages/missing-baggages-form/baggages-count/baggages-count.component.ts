import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldControlComponent } from "../../../../shared/components/form/field-control/field-control.component";
import { MaterialModule } from '../../../../shared/external-modules/material-module';
import { BaggageContentGroupItem } from '../../typed-forms';

export type BagsContent = {contentName: string, price: number, quantity: number};

@Component({
    selector: 'app-baggages-count',
    standalone: true,
    templateUrl: './baggages-count.component.html',
    styleUrl: './baggages-count.component.scss',
    imports: [MaterialModule, FieldControlComponent]
})
export class BaggagesCountComponent {
   @Input() bagsContents: FormArray = new FormArray<FormGroup<BaggageContentGroupItem>>([]);
   @Output() removeContent: EventEmitter<number> = new EventEmitter();
    
      removeBaggageContentAndQuantity(index: number): void {
        this.removeContent.emit(index);
      }
}

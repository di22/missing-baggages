import { Component, Input, OnChanges } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { GridColumn } from '../table-config';

@Component({
  selector: 'app-grid-client-side',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './grid-client-side.component.html'
})
export class GridClientSideComponent<T> implements OnChanges {
  @Input() dataSource: T[];
  @Input() columns: GridColumn[];
  columnsProperties: string[];

  ngOnChanges(): void {
    if(this.columns) {
      this.columnsProperties = this.columns.map(c => c.property);
    }
  }
}

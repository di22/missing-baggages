import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';
import { AsyncPipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { MaterialModule } from '../../../external-modules/material-module';

@Component({
    selector: 'app-auto-complete',
    standalone: true,
    templateUrl: './auto-complete.component.html',
    imports: [MaterialModule, ReactiveFormsModule, AsyncPipe]
})
export class AutoCompleteComponent extends BaseControlComponent implements OnInit {
  ngOnInit(): void {
    this._control.valueChanges.pipe(
      startWith(''),
     debounceTime(200),
    distinctUntilChanged(),
    ).subscribe(value => {
        if(value) this.search.emit(value);
      })
}

onSelect(value: string): void {
  this._control.setValue(value, {emitEvent: false});
}
}

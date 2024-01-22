import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AirportService } from '../domain/airport/airport.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type AirportsState = { 
  airports: string[];
  loading: boolean;
 };

const initialState: AirportsState = { 
  airports: [],
  loading: false
 };

export const AirportsStore = signalStore(
    withState(initialState),
    withMethods((store, airportService = inject(AirportService)) => ({
      async loadAll(query: string) {
        patchState(store, { loading: true });
        const airports = await airportService.getAirport(query).toPromise();
        patchState(store, { airports, loading: false });
      },
      loadByQuery: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap((query) =>
            airportService.getAirport(query).pipe(
              tap({
                next: (airports: string[]) => patchState(store, { airports }),
                error: console.error,
                finalize: () => patchState(store, { loading: false }),
              }),
            ),
          ),
        ),
      ),
    })
    )
  );
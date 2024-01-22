import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Airport } from './models';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  airportsUrl: string = 'https://api.api-ninjas.com/v1/airports';
 
  constructor(private http: HttpClient) { }

  getAirport(name: string): Observable<string[]> {
    const params = {
      'offset': '50'
  };
    const headers = {
      'X-Api-Key': 'o3gmMiH5TAW237sejxStWQ==CVPSJhmb9HNJ2JiF'
  };
    return this.http.get<Airport[]>(`${this.airportsUrl}?name=${name}`, {headers, params}).pipe(map(airport => airport.map(e => e.name)));
  }
}

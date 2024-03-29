import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideAnimations(), 
     importProvidersFrom(HttpClientModule),
      provideStore(),
      provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        connectInZone: true
      }),]
};

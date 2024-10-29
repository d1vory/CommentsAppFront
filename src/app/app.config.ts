import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideQuillConfig} from 'ngx-quill';
import {RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY} from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    provideQuillConfig({
      modules: {
        syntax: false,
        toolbar: [['bold', 'italic', 'link', 'code', "clean"],]
      }
    }),

    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6Ld2yW8qAAAAAAo9d6yoUyx56zb40bO6QvzCg-WG" },

  ]
};

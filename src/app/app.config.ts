import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideQuillConfig} from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    provideQuillConfig({
      modules: {
        syntax: false,
        toolbar: [['bold', 'italic', 'link', 'code', "clean"],]
      }
    })
  ]
};

import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { App } from './app/app';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth-interceptor';

bootstrapApplication(App, {
  providers: [
    // HTTP client with Fetch driver + JWT interceptor
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),

    // Angular router
    provideRouter(routes)
  ]
}).catch(err => console.error(err));

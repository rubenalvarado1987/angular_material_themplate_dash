import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NgxAnalyticsGoogleAnalytics } from "ngx-analytics/ga";


// document.querySelector('#splash-version').innerHTML = environment.version;

if (environment.production) {
  enableProdMode();
  NgxAnalyticsGoogleAnalytics.prototype.createGaSession(environment.googleAnalytics);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
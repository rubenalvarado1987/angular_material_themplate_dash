import { Component } from '@angular/core';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';


@Component({
  selector: 'app-component',
  templateUrl: './app.component.html'
  // styles:[' .msg {position: relative;}']
})
export class AppComponent  {
  name = 'App';
  constructor(ngxAnalyticsGoogleAnalytics: NgxAnalyticsGoogleAnalytics) {}

}

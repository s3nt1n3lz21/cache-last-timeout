import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cache-last-timeout';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    console.log('api timeout: 5000ms');
    setTimeout(
      () => {
        console.log('calling api at 0000ms');
        this.apiService.fetchWeatherInfoCached(false, 'london').subscribe(
        (data) => {})
      }
      , 0);

      setTimeout(
        () => {
          console.log('calling api at 1000ms');
          this.apiService.fetchWeatherInfoCached(false, 'london').subscribe(
          (data) => {})
        }
        , 1000);

        setTimeout(
          () => {
            console.log('calling api at 4000ms');
            this.apiService.fetchWeatherInfoCached(false, 'london').subscribe(
            (data) => {})
          }
          , 4000);

          setTimeout(
            () => {
              console.log('calling api at 7000ms');
              this.apiService.fetchWeatherInfoCached(false, 'london').subscribe(
              (data) => {})
            }
            , 7000);

            setTimeout(
              () => {
                console.log('calling api at 10000ms');
                this.apiService.fetchWeatherInfoCached(false, 'london').subscribe(
                (data) => {})
              }
              , 10000);
  }
}

import { Component, OnInit } from '@angular/core';

export type cacheLastTimeout = Map<Function, 
  {

    timeout: 
  }
>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cache-last-timeout';

  // Cache the last value, get a new value every timeout, or retrieve early if retrieveNow = true
  // Used for caching api responses or 
  cacheLastTimeout = (func, timeout, retrieveNow) => {
    const results = {};
    const last = null;
    return (...args) => {
      const argsKey = JSON.stringify(args);
      if (!results[argsKey] || Date.now() - last > timeout || retrieveNow) {
        results[argsKey] = func(...args);
      }
      return results[argsKey];
    };
  };

  valueChanges() {

  }

  ngOnInit() {
    console.time();

    console.timeEnd();
  }
}

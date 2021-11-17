import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";

type ApiCache = { [key: string]: { value: Observable<any>, expiresAt: number }}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    apikey = '67ee016f9c786105caf40a364be6a65b';
    apiCache: ApiCache = {};

    constructor(private _http: HttpClient) {}

    // To start caching a particular API you do not need to make
    // any changes to the original function. We just pass the function
    // to call into cacheWithTimeout.

    // Cache the last value, get a new value every timeout, or retrieve early if retrieveNow = true
    // Used for caching api responses or 
    cacheWithTimeout = (func, args, timeout = 0, retrieveNow = true) => {
        const now = Date.now();
        // console.log('func name: ', func);
        // Call the function again if currently no value, timeout expired or retrieving now.
        if (!this.apiCache[func] || this.apiCache[func].expiresAt < now || retrieveNow) {
            this.apiCache[func] = {
                value: func(...args),
                expiresAt: now + timeout
            };
            console.log('grabbing new value');
        }
        // console.log('this.apiCache ', this.apiCache);
        return this.apiCache[func].value;
    };

    // Original API function
    fetchWeatherInfo = (cityName) => {
        return this._http.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.apikey}`
        )
    };

    // Cached API function
    // Put the original func args at the end so we can easily find and replace the function in the editor
    fetchWeatherInfoCached = (retrieveNow = true, ...args) => 
        this.cacheWithTimeout(this.fetchWeatherInfo, args, 5000, retrieveNow);

    // We can replace fetchWeatherInfo(x) with fetchWeatherInfoCache(true, x)
    // Then go through and set retrieveNow to false, making sure the app works as expected 
}
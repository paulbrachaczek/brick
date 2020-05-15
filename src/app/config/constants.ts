import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = 'https://api.openweathermap.org/data/2.5/';
    public readonly API_KEY: string = 'c91cc86160c0e0fac2b3ae224cfd8dd9';
    // public readonly API_KEY: string = '530cc401e59e9c16d123d342e402c3a2';
    public readonly API_UNITS: string = 'metric';
}

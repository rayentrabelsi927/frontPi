import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'http://localhost:8089/projectARCTIC3/weather'; // Adjusted baseUrl

  constructor(private httpClient: HttpClient) { }

  getWeatherForCity(city: string, country: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${city}/${country}`); // Adjusted URL
  }

  getTomorrowWeatherForAriana(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/tomorrowAriana`); // Adjusted URL
  }

  getWeatherForecast(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/forecast`); // Adjusted URL
  }

  checkCriticalWeather(city: string, country: string): Observable<string> {
    return this.httpClient.get<string>(`${this.baseUrl}/critical?city=${city}&country=${country}`); // Adjusted URL
  }
}


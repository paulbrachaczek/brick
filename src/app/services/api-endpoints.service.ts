import { Injectable } from '@angular/core';
import { UrlBuilder } from '../shared/url-builder';
import { QueryStringParameters } from '../shared/query-string-params';
import { Constants } from '../config/constants';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointsService {

  constructor(
    private constants: Constants
  ) { }

  private createUrl(
    action: string,
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    return urlBuilder.toString();
  }

  private createUrlWithQueryParameters(
    action: string,
    queryStringHandler?:
      (queryStringParameters: QueryStringParameters) => void
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      action
    );
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  private createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = []
  ): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl +=
          `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      this.constants.API_ENDPOINT,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.toString();
  }

  public getCityByName(
    cityName: string
  ): string {
    return this.createUrlWithQueryParameters(
      'weather', (qs: QueryStringParameters) => {
        qs.push('q', cityName);
        qs.push('appid', this.constants.API_KEY);
        qs.push('units', this.constants.API_UNITS);
      }
    );
  }

  public getCityById(
    id: number
  ): string {
    return this.createUrlWithQueryParameters(
      'forecast', (qs: QueryStringParameters) => {
        qs.push('id', id);
        qs.push('appid', this.constants.API_KEY);
        qs.push('units', this.constants.API_UNITS);
      }
    );
  }

  public getCityByCoords(
    coords: any[]
  ): string {
    return this.createUrlWithQueryParameters(
      'onecall', (qs: QueryStringParameters) => {
        qs.push('lat', coords[0]);
        qs.push('lon', coords[1]);
        qs.push('exclude', 'hourly');
        qs.push('appid', this.constants.API_KEY);
        qs.push('units', this.constants.API_UNITS);
      }
    );
  }

  public getCitiesByIds(
    ids: number[]
  ): string {
    return this.createUrlWithQueryParameters(
      'group', (qs: QueryStringParameters) => {
        qs.push('id', ids.join());
        qs.push('appid', this.constants.API_KEY);
        qs.push('units', this.constants.API_UNITS);
      }
    )
  }
}

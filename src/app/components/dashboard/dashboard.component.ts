import { Component, OnInit } from '@angular/core';
import {ApiEndpointsService} from '../../services/api-endpoints.service';
import {ApiHttpService} from '../../services/api-http.service';
import {Observable} from 'rxjs';
import {ICity} from '../../model/city';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cityName: string;
  cityData;

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointService: ApiEndpointsService
  ) {}

  ngOnInit() {
  }

  getCityFromInput(_city) {
    this.apiHttpService.get(this.apiEndpointService.getCityByName(_city))
    .subscribe((data) => {
      this.cityData = data;
    }, error => {
      console.log(error);
    });
  }

}

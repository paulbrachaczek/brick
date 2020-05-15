import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiEndpointsService} from '../../services/api-endpoints.service';
import {ApiHttpService} from '../../services/api-http.service';
import {ICity} from '../../model/city';
import {FavService} from '../../services/fav.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: number;
  name: string;
  days = [];
  favData = [];
  sunrise;
  sunset;
  now;

  constructor(
    private route: ActivatedRoute,
    private apiHttpService: ApiHttpService,
    private apiEndpointService: ApiEndpointsService,
    private favService: FavService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.favService.favCities.subscribe(cities => {
      this.favData = cities;
    });

    const lon = this.favData.filter(city => city.id.toString() === this.id).map(city => city.lon);
    const lat = this.favData.filter(city => city.id.toString() === this.id).map(city => city.lat);
    this.name = this.favData.filter(city => city.id.toString() === this.id).map(city => city.name).toString();
    this.apiHttpService.get(this.apiEndpointService.getCityByCoords([lat,lon]))
    .subscribe((data: any|ICity) => {
      this.days = data.daily;
      this.sunrise = new Date(data.current.sunrise*1000).toLocaleTimeString();
      this.sunset = new Date(data.current.sunset*1000).toLocaleTimeString();
      this.now = data.current;
    });
  }
}

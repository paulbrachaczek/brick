import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavService } from '../../services/fav.service';
import { ApiEndpointsService } from '../../services/api-endpoints.service';
import { ApiHttpService } from '../../services/api-http.service';
import { ICity } from 'src/app/model/city';
import { IFav } from '../../model/fav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
})
export class FavouriteComponent implements OnInit {
  favouriteCities: ICity[];
  searchCityName;
  subscription$: Subscription;
  sortby = -1;

  constructor(
    private favService: FavService,
    private apiHttpService: ApiHttpService,
    private apiEndpoitsService: ApiEndpointsService
  ) { }

  ngOnInit(): void {
    this.subscription$ = this.favService.favCities.subscribe((cities) => {
      if(cities !== null && cities.length) {
        const ids = cities.map((city: IFav) => city.id);
        this.apiHttpService.get(this.apiEndpoitsService.getCitiesByIds(ids))
          //.takeUntil(componentDestroyed(this))
          .subscribe((data: any) => {
            this.favouriteCities = data.list;
          });
      }
    });
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  removeAll(): void {
    this.favService.removeAll();
    this.favouriteCities = [];
  }

  sort(_p) {
    this.sortby = _p;
  }
}

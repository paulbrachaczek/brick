import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { FavService } from '../../services/fav.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() temp: string;
  @Input() icon: string;
  @Input() desc: string;
  @Input() humidity: string;
  @Input() lon: number;
  @Input() lat: number;
  subscription$: Subscription;
  fav = false;
  favData = [];
  favText = 'Add to fav';

  constructor(private favService: FavService) { }

  ngOnInit(): void {
    this.subscription$ = this.favService.favCities.subscribe(cities => {
      if(Array.isArray(cities)){
        this.favData = cities;
        this.verifyFav();
      }
    });
  }

  ngOnChanges() {
    this.verifyFav();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  verifyFav() {
    if(this.favData.some(fav => fav.id === this.id)) {
      this.fav = true;
      this.favText = 'Remove from fav';
    } else {
      this.fav = false;
      this.favText = 'Add to fav';
    }
  }

  addToFav(name: string, id: number, lon: number, lat: number): void {
    if(this.favData.some(fav => fav.id === id)) {
      this.favData = this.favData.filter(city => city.id !== id);
    } else {
      this.favData.push({
        'name': name,
        'id': id,
        'lon': lon,
        'lat': lat
      });
    }
    this.favService.setFav(this.favData);
  }

}

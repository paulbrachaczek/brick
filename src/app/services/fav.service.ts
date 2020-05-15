import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class FavService {
  private fav = new BehaviorSubject<null|[]>(null);
  public favCities = this.fav.asObservable();

  constructor() { }

  public getFav() {
    this.fav.next(JSON.parse(localStorage.getItem('fav')));
  }

  public setFav(favData) {
    localStorage.setItem('fav', JSON.stringify(favData));
    this.getFav();
  }

  public removeAll() {
    localStorage.removeItem('fav');
    this.fav.next(null);
  }
}

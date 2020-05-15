import { Component, OnInit } from '@angular/core';
import {FavService} from './services/fav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
      private favService: FavService
  ) {}

  ngOnInit() {
    this.favService.getFav();
  }
}

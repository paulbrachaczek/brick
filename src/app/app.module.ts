import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Constants } from './config/constants';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CitiesPipe } from './pipes/cities.pipe';
import { DayComponent } from './components/day/day.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FavouriteComponent,
    DashboardComponent,
    DetailsComponent,
    SearchbarComponent,
    CitiesPipe,
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Constants],
  bootstrap: [AppComponent]
})
export class AppModule { }

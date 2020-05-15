import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cities'
})
export class CitiesPipe implements PipeTransform {
  transform(cities: any, searchCityName: string, sortby: number): any {
    if(!searchCityName && sortby < 0) return cities;

    if(searchCityName){
      return cities.filter((city) => {
        return city.name.toLowerCase().indexOf(searchCityName.toLowerCase()) > -1;
      });
    }

    if(sortby === 0) {
      return cities.sort((a,b) => Intl.Collator().compare(a.name,b.name));
    }
    if(sortby === 1) {
      return cities.sort((a,b) => Intl.Collator().compare(b.name,a.name));
    }
  }

}

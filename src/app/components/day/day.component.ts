import { Component, OnInit, Input } from '@angular/core';
import { ICity } from '../../model/city';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {
  @Input() day;

  constructor() { }

  ngOnInit(): void {
  }

}

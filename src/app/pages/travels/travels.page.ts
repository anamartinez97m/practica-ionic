import { Component, OnInit } from '@angular/core';
import { DEFAULT_IMG } from 'src/app/global-constants';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {

  public continents: string[] = [
    'europe',
    'northAmerica',
    'southAmerica',
    'africa',
    'asia',
    'oceania',
    'antarctica'
  ];
  // TODO cambiar any por tipo Place
  public continentsMap: Map<String, any> = new Map();
  // public defaultImg = DEFAULT_IMG;
  public places;

  constructor(private travelsService: TravelsService) { }

  ngOnInit() {
    this.places = this.travelsService.getTravelstMock();

    for(const continent of this.continents) {
      this.continentsMap.set(continent, []);
    }

    for(const place of this.places) {
      let temp = [];
      temp.push(place);
      this.continentsMap.set(place.continent, temp);
    }
  }

}

import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { DEFAULT_IMG } from 'src/app/global-constants';
import { StorageService } from 'src/app/services/storage.service';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit, AfterContentInit {

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
  public places;

  constructor(
    private travelsService: TravelsService,
    private storage: StorageService
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.places = this.travelsService.getTravels();
    this.initializeContinentsContent();
  }

  initializeContinentsContent() {
    const placesFromMock = this.travelsService.getTravelsFromMock();
    const temp = [];
    let count = 0;

    for(const continent of this.continents) {
      this.continentsMap.set(continent, []);
    }

    for(const place of this.places) {
      const continentPlacesList = this.continentsMap.get(place.continent);
      this.continentsMap.set(place.continent, [...continentPlacesList, place]);
    }

    for(const p of placesFromMock) {
      const continentPlacesList = this.continentsMap.get(p.continent);
      this.continentsMap.set(p.continent, [...continentPlacesList, p]);
    }

    count = this.places.length + placesFromMock.length;

    this.storage.set('travelsLength', count);
  }

}

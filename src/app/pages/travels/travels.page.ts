import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Place } from 'src/app/interfaces/place';
import { StorageService } from 'src/app/services/storage.service';
import { TravelsService } from 'src/app/services/travels.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit, AfterContentInit {

  public continents: string[] = this.travelsService.getContinents();
  public continentsMap: Map<string, Set<Place>>;

  constructor(
    private travelsService: TravelsService,
  ) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.travelsService.getTravels().then(value => this.continentsMap = value);
  }

  getPlacesSetFromContinent(continent: string): Place[] {
    return Array.from(this.continentsMap.get(continent));
  }

}

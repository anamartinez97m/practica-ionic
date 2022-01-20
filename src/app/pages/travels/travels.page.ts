import { Location } from '@angular/common';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
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
  public placeSelected: Place;
  public aPlaceIsSelected = false;

  constructor(
    private platform: Platform,
    private location: Location,
    private travelsService: TravelsService,
  ) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.travelsService.getTravels().then(value => this.continentsMap = value);
  }

  getPlacesSetFromContinent(continent: string): Place[] {
    return this.travelsService.getPlacesFromContinent(continent);
  }

  setSelectedPlace(place: Place, i, j) {
    this.placeSelected = place;
    this.aPlaceIsSelected = true;
    place.showDetails = !place.showDetails;
    
    if(place.showDetails) {
      this.placeSelected = place;
      this.aPlaceIsSelected = true;
      this.expandDetails(place, i, j);
    } else {
      this.aPlaceIsSelected = false;
      this.collapseDetails(place, i, j);
    }
  }

  expandDetails(place: Place, i, j) {
    document.getElementById(`placeId-${i}-${j}`).style.whiteSpace = 'normal';
  }

  collapseDetails(place: Place, i, j) {
    document.getElementById(`placeId-${i}-${j}`).style.whiteSpace = 'nowrap';
  }

}

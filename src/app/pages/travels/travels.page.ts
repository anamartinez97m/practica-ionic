import { Component, OnInit } from '@angular/core';
import { DEFAULT_IMG } from 'src/app/global-constants';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {

  public continents: any[] = [];
  public defaultImg = DEFAULT_IMG;

  constructor() { }

  ngOnInit() {
    this.continents.push({
      name: 'continent.europe', 
      places: [{
        country:'España', 
        city:'Madrid', 
        description:'Madrid es la capital de España.', 
        image:'./assets/places/madrid.jpg'
      }]
    });
    this.continents.push({name: 'continent.northAmerica', places: [{}]});
    this.continents.push({name: 'continent.southAmerica', places: [{}]});
    this.continents.push({name: 'continent.africa', places: [{}]});
    this.continents.push({name: 'continent.asia', places: [{}]});
    this.continents.push({name: 'continent.oceania', places: [{}]});
    this.continents.push({name: 'continent.antarctica', places: [{}]});
  }

  show(place: any): boolean {
    return Object.keys(place).length > 0;
  }

}

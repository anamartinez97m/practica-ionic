import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
})
export class TravelsPage implements OnInit {

  public continents: any[] = [];

  constructor() { }

  ngOnInit() {
    this.continents.push({
      name: 'Europa', 
      places: [{
        country:'Spain', 
        city:'Madrid', 
        description:'Madriz', 
        image:'./assets/madrid.jpg'
      }]
    });
    this.continents.push({name: 'América del Norte', places: [{}]});
    this.continents.push({name: 'América del Sur', places: [{}]});
    this.continents.push({name: 'África', places: [{}]});
    this.continents.push({name: 'Asia', places: [{}]});
    this.continents.push({name: 'Oceanía', places: [{}]});
    this.continents.push({name: 'Antártida', places: [{}]});
  }

  show(place: any): boolean {
    return Object.keys(place).length > 0;
  }

}

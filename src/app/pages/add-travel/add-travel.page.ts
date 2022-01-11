import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.page.html',
  styleUrls: ['./add-travel.page.scss'],
})
export class AddTravelPage implements OnInit {

  public selectedOption: string;
  public searchbar: string;

  constructor() { }

  ngOnInit() {
  }

  savePlace() {
    console.log(this.selectedOption);
    console.log(this.searchbar);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.page.html',
  styleUrls: ['./add-travel.page.scss'],
})
export class AddTravelPage implements OnInit {

  public selectedOption: string;
  public searchbar: string;
  private url: string = '';

  constructor(private router: Router) {
    this.url = this.router.url;
  }

  ngOnInit() {
  }

  savePlace() {
    console.log(this.searchbar);

    if(this.url === '/add-travel') {
      if(this.selectedOption === 'w') {
        this.router.navigate(['/wish-list']);
      } else if(this.selectedOption === 't') {
        this.router.navigate(['/travels']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

}

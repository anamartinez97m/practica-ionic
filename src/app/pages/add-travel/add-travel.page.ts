import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PLACES_TO_SEARCH } from 'src/app/placesToSearch';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.page.html',
  styleUrls: ['./add-travel.page.scss'],
})
export class AddTravelPage implements OnInit {

  public selectedOption: string;
  public searchbar: string;
  public searchbarIsFocused: boolean = false;
  private url: string = '';
  private arrayToSearch = PLACES_TO_SEARCH;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    this.url = this.router.url;
  }

  ngOnInit() {}

  searchbarHasFocus() {
    this.searchbarIsFocused = !this.searchbarIsFocused;
  }

  selectPlace(place: any) {
    console.log(place);
  }

  isSearchbarValid() {
    return this.searchbar !== undefined && this.searchbar.length > 0;
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    const list = document.querySelector('ion-list');
    if(list) {
      const items = Array.from(list.children);

      requestAnimationFrame(() => {
        items.forEach((item: any, index) => {
          // const item = document.getElementById(`item-${index}`);
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';

          // if (item) {
          //   item.style.display = shouldShow ? 'block' : 'none';
          // }
        });
      });
    }
    
  }

  savePlace() {
    console.log(this.searchbar);

    if(this.url === '/add-travel') {
      if(this.selectedOption === 'w') {
        this.router.navigate(['/wish-list']);
      } else if(this.selectedOption === 't') {
        this.router.navigate(['/travels']);
      } else {
        this.presentToast();
      }
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.translate.instant('commons.saveError'),
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

}

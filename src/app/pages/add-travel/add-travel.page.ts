import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Place } from 'src/app/interfaces/place';
import { PLACES_TO_SEARCH } from 'src/app/mocks/placesToSearch';
import { TravelsService } from 'src/app/services/travels.service';
import { WishListService } from 'src/app/services/wishlist.service';

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
  private placeToSave: Place;

  constructor(
    private platform: Platform,
    private location: Location,
    private router: Router,
    private toastController: ToastController,
    private translate: TranslateService,
    private wishlistService: WishListService,
    private travelsService: TravelsService
  ) {
    this.url = this.router.url;

    this.platform.backButton.subscribeWithPriority(10, () => {
      this.location.back();
    });
  }

  ngOnInit() {}

  searchbarHasFocus() {
    this.searchbarIsFocused = !this.searchbarIsFocused;
  }

  selectPlace(place: Place, i) {
    this.placeToSave = place;
    const item = document.getElementById(`item-${i}`);
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
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? 'block' : 'none';
        });
      });
    }
    
  }

  savePlace() {
    if(this.placeToSave !== undefined && this.url === '/add-travel') {
      if(this.selectedOption === 'w') {
        this.wishlistService.addPlaceToWishList(this.placeToSave);
        this.router.navigate(['/wish-list']);
      } else if(this.selectedOption === 't') {
        this.travelsService.addPlaceToTravels(this.placeToSave);
        this.router.navigate(['/travels']);
      }
    } else {
      this.presentToast();
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_IMG } from 'src/app/global-constants';
import { Place } from 'src/app/interfaces/place';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  public wishlistToShow: Set<Place> = new Set();
  public defaultImg = DEFAULT_IMG;
  public modeListIsEnabled: boolean = true;
  public modeMapIsEnabled: boolean = false;
  public placeDetailsOpenedList: { city: string; show: boolean }[] = [];
  private url: string = '';

  constructor(
    private wishlistService: WishListService,
    private router: Router
  ) {
    this.url = this.router.url;
  }

  ngOnInit() {
    this.wishlistService.initializeWishList();
    this.wishlistToShow = this.wishlistService.getWishListMock();
    this.placeDetailsOpenedList = Array.from(this.wishlistToShow).map(place => ({ city: place.city, show: false }));
  }

  changeViewMode() {
    if(this.modeListIsEnabled) {
      this.modeListIsEnabled = false;
      this.modeMapIsEnabled = true;
    } else {
      this.modeListIsEnabled = true;
      this.modeMapIsEnabled = false;
    }
  }

  openOptions(place: Place) {
    const placeDetails = this.placeDetailsOpenedList.find(details => details.city === place.city); 
    if(placeDetails) {
      placeDetails.show = true;
    }
  }

  closeOptions(place: Place) {
    const placeDetails = this.placeDetailsOpenedList.find(details => details.city === place.city);
    if(placeDetails) {
      placeDetails.show = false;
    }
  }

  deletePlaceFromWishList(place: Place) {
    this.wishlistService.deletePlaceFromWishList(place);
  }

  areOptionsShown(place: Place) {
    return this.placeDetailsOpenedList.find(details => details.city === place.city).show;
  }

  moveToPlacesBeen(place: Place) {
    this.wishlistService.addPlaceToPlacesBeen(place);
    this.deletePlaceFromWishList(place);

    if(this.url === '/wish-list') {
      this.router.navigate(['/travels']);
    }
  }

}

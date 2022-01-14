import { Component, OnInit } from '@angular/core';
import { DEFAULT_IMG } from 'src/app/global-constants';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  public wishlistToShow: Set<any> = new Set();
  public defaultImg = DEFAULT_IMG;
  public modeListIsEnabled: boolean = true;
  public modeMapIsEnabled: boolean = false;
  public placeDetailsOpenedList: { city: string; show: boolean }[] = []; 

  constructor(private wishlistService: WishListService) {}

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

  openOptions(place: any) {
    const placeDetails = this.placeDetailsOpenedList.find(details => details.city === place.city); 
    if(placeDetails) {
      placeDetails.show = true;
    }
  }

  closeOptions(place: any) {
    const placeDetails = this.placeDetailsOpenedList.find(details => details.city === place.city);
    if(placeDetails) {
      placeDetails.show = false;
    }
  }

  deletePlaceFromWishList(place: any) {
    this.wishlistService.deletePlaceFromWishList(place);
  }

  areOptionsShown(place: any) {
    return this.placeDetailsOpenedList.find(details => details.city === place.city).show;
  }

  moveToPlacesBeen(place: any) {
    this.wishlistService.addPlaceToPlacesBeen(place);
    this.deletePlaceFromWishList(place);
  }

}

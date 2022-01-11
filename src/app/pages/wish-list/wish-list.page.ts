import { Component, OnInit } from '@angular/core';
import { DEFAULT_IMG } from 'src/app/global-constants';
import { WishListService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  public wishlistToShow: any[] = [];
  public defaultImg = DEFAULT_IMG;
  public modeListIsEnabled: boolean = true;
  public modeMapIsEnabled: boolean = false;
  public placeDetailsOpenedList: { title: string; show: boolean }[] = []; 

  constructor(private wishlistService: WishListService) {}

  ngOnInit() {
    this.wishlistToShow = this.wishlistService.getWishListMock();
    this.placeDetailsOpenedList = this.wishlistToShow.map(place => ({ title: place.title, show: false }));
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
    const placeDetails = this.placeDetailsOpenedList.find(details => details.title === place.title); 
    if(placeDetails) {
      placeDetails.show = true;
    }
  }

  closeOptions(place: any) {
    const placeDetails = this.placeDetailsOpenedList.find(details => details.title === place.title);
    if(placeDetails) {
      placeDetails.show = false;
    }
  }

  deletePlaceFromWishList(place: any) {
    this.wishlistService.deletePlaceFromWishList(place);
  }

  areOptionsShown(place: any) {
    return this.placeDetailsOpenedList.find(details => details.title === place.title).show;
  }

}

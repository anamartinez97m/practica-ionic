import { Injectable } from "@angular/core";
import { WISHLIST_MOCK } from "../wishListMock";


@Injectable({
    providedIn: 'root'
})
export class WishListService {
    private wishlist: any[] = [];

    constructor() {}

    getWishListMock() {
        return WISHLIST_MOCK;
    }

    addPlaceToWishList(place: any) {
        // TODO: comprobar que no se repitan
        this.wishlist.push(place);
    }

    deletePlaceFromWishList(place: any) {        
        console.log(place.title, "ha sido borrado");
    }
}
import { Injectable } from "@angular/core";
import { WISHLIST_MOCK } from "../wishListMock";


@Injectable({
    providedIn: 'root'
})
export class WishListService {
    private wishlist: Set<any> = new Set();

    constructor() {}

    initializeWishList() {
        for(const place of WISHLIST_MOCK) {
            this.wishlist.add(place);
        }
    }

    getWishListMock() {
        return this.wishlist;
    }

    addPlaceToWishList(place: any) {
        // TODO: comprobar que no se repitan
        this.wishlist.add(place);
    }

    deletePlaceFromWishList(place: any) {
        console.log(this.wishlist);
        console.log(place.title, "ha sido borrado");
        
        this.wishlist.delete(place);

        console.log(this.wishlist);
    }
}
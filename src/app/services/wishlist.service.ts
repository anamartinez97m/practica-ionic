import { Injectable } from "@angular/core";
import { Place } from "../interfaces/place";
import { WISHLIST_MOCK } from "../mocks/wishListMock";
import { StorageService } from "./storage.service";
import { TravelsService } from "./travels.service";


@Injectable({
    providedIn: 'root'
})
export class WishListService {
    private wishlist: Set<Place> = new Set();

    constructor(
        private travelsService: TravelsService,
        private storage: StorageService
    ) {}

    initializeWishList() {
        for(const place of WISHLIST_MOCK) {
            this.wishlist.add(place);
        }

        this.storage.set('wishlistLength', this.wishlist.size);
    }

    getWishListMock() {
        return this.wishlist;
    }

    addPlaceToWishList(place: Place) {
        this.wishlist.add(place);
        this.storage.get('wishlistLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength + 1;
                this.storage.set('wishlistLength', currentLength);
            });
    }

    deletePlaceFromWishList(place: Place) {
        console.log(place.city, "ha sido borrado");
        this.wishlist.delete(place);

        this.storage.get('wishlistLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength - 1;
                this.storage.set('wishlistLength', currentLength);
            });
    }

    addPlaceToPlacesBeen(place: Place) {
        this.travelsService.addPlaceToTravels(place);
    }
}
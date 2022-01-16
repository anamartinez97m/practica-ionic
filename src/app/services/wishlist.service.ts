import { Injectable } from "@angular/core";
import { WISHLIST_MOCK } from "../wishListMock";
import { StorageService } from "./storage.service";
import { TravelsService } from "./travels.service";


@Injectable({
    providedIn: 'root'
})
export class WishListService {
    private wishlist: Set<any> = new Set();

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

    addPlaceToWishList(place: any) {
        this.wishlist.add(place);
        this.storage.get('wishlistLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength + 1;
                this.storage.set('wishlistLength', currentLength);
            });
    }

    deletePlaceFromWishList(place: any) {
        console.log(place.city, "ha sido borrado");
        this.wishlist.delete(place);

        this.storage.get('wishlistLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength - 1;
                this.storage.set('wishlistLength', currentLength);
            });
    }

    addPlaceToPlacesBeen(place: any) {
        this.travelsService.addPlaceToTravels(place);
    }
}
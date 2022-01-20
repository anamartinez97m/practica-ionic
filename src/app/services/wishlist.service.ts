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

        this.storage.get('wishlistLength').then((len) => {
            if(len <= this.wishlist.size) {
                this.storage.set('wishlistLength', this.wishlist.size);
                this.storage.set('wishlist', this.wishlist);
            }
        });
    }

    async getWishList() {
        await this.storage.get('wishlist')
            .then((value) => {
                Array.from(value)
                .map((place: Place) => {
                    const exists = Array.from(this.wishlist).find(item => item.id === place.id);
                    if(!exists) {
                        this.wishlist.add(place);
                    }
                });
            });

        return Promise.resolve(this.wishlist);
    }

    addPlaceToWishList(place: Place) {
        this.wishlist.add(place);
        this.storage.get('wishlistLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength + 1;
                this.storage.set('wishlistLength', currentLength);
                this.storage.set('wishlist', this.wishlist);
            });
    }

    deletePlaceFromWishList(place: Place) {
        this.wishlist.delete(place);

        this.storage.get('wishlistLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength - 1;
                this.storage.set('wishlistLength', currentLength);
                this.storage.set('wishlist', this.wishlist);
            });
    }

    addPlaceToPlacesBeen(place: Place) {
        this.travelsService.addPlaceToTravels(place);
    }
}
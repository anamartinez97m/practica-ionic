import { Injectable } from "@angular/core";
import { WISHLIST_MOCK } from "../wishListMock";
import { TravelsService } from "./travels.service";


@Injectable({
    providedIn: 'root'
})
export class WishListService {
    private wishlist: Set<any> = new Set();

    constructor(private travelsService: TravelsService) {}

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
        console.log(place.city, "ha sido borrado");
        this.wishlist.delete(place);
    }

    addPlaceToPlacesBeen(place: any) {
        this.travelsService.addPlaceToTravels(place);
    }
}
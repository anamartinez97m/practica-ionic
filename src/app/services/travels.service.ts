import { Injectable } from "@angular/core";
import { Place } from "../interfaces/place";
import { PLACES_BEEN_MOCK } from "../mocks/myTravelsMock";
import { StorageService } from "./storage.service";


@Injectable({
    providedIn: 'root'
})
export class TravelsService {
    private travels: Place[] = [];

    constructor(private storage: StorageService) {}

    getTravelsFromMock() {
        return PLACES_BEEN_MOCK;
    }

    getTravels() {
        return this.travels;
    }

    addPlaceToTravels(place: Place) {
        // TODO: comprobar que no se repitan
        this.travels.push(place);

        this.storage.get('travelsLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength + 1;
                this.storage.set('travelsLength', currentLength);
            });
    }

    deletePlaceFromTravels(place: Place) {        
        console.log(place.city, "ha sido borrado");

        this.storage.get('travelsLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength - 1;
                this.storage.set('travelsLength', currentLength);
            });
    }
}
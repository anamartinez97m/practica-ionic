import { Injectable } from "@angular/core";
import { PLACES_BEEN_MOCK } from "../myTravelsMock";
import { StorageService } from "./storage.service";


@Injectable({
    providedIn: 'root'
})
export class TravelsService {
    private travels: any[] = [];

    constructor(private storage: StorageService) {}

    getTravelsFromMock() {
        return PLACES_BEEN_MOCK;
    }

    getTravels() {
        return this.travels;
    }

    addPlaceToTravels(place: any) {
        // TODO: comprobar que no se repitan
        this.travels.push(place);

        this.storage.get('travelsLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength + 1;
                this.storage.set('travelsLength', currentLength);
            });
    }

    deletePlaceFromTravels(place: any) {        
        console.log(place.city, "ha sido borrado");

        this.storage.get('travelsLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength - 1;
                this.storage.set('travelsLength', currentLength);
            });
    }
}
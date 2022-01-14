import { Injectable } from "@angular/core";
import { PLACES_BEEN_MOCK } from "../myTravelsMock";


@Injectable({
    providedIn: 'root'
})
export class TravelsService {
    private travels: any[] = [];

    constructor() {}

    getTravelsFromMock() {
        return PLACES_BEEN_MOCK;
    }

    getTravels() {
        console.log(this.travels);
        return this.travels;
    }

    addPlaceToTravels(place: any) {
        // TODO: comprobar que no se repitan
        this.travels.push(place);
        console.log(this.travels);
    }

    deletePlaceFromTravels(place: any) {        
        console.log(place.city, "ha sido borrado");
    }
}
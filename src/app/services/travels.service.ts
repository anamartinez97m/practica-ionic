import { Injectable } from "@angular/core";
import { PLACES_BEEN_MOCK } from "../myTravelsMock";


@Injectable({
    providedIn: 'root'
})
export class TravelsService {
    private travels: any[] = [];

    constructor() {}

    getTravelstMock() {
        return PLACES_BEEN_MOCK;
    }

    addPlaceToTravels(place: any) {
        // TODO: comprobar que no se repitan
        this.travels.push(place);
    }

    deletePlaceFromTravels(place: any) {        
        console.log(place.city, "ha sido borrado");
    }
}
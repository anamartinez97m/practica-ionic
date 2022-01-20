import { Injectable } from "@angular/core";
import { Place } from "../interfaces/place";
import { PLACES_BEEN_MOCK } from "../mocks/myTravelsMock";
import { StorageService } from "./storage.service";


@Injectable({
    providedIn: 'root'
})
export class TravelsService {
    public continents: string[] = [
        'europe',
        'northAmerica',
        'southAmerica',
        'africa',
        'asia',
        'oceania',
        'antarctica'
      ];
    public continentsMap: Map<string, Set<Place>> = new Map();
    private travels: Set<Place> = new Set();

    constructor(private storage: StorageService) {}

    getContinents() {
        return this.continents;
    }

    async getTravels() {
        await this.storage.get('travels')
            .then((value) => {

                const continentsMap = value;

                for(const continent of continentsMap) {
                    const placesSet = this.continentsMap.get(continent[0]);
                    const placesFromContinent = continent[1];

                    Array.from(placesFromContinent)
                    .map((place: Place) => {
                        const exists = Array.from(placesSet).find((item: Place) => item.id === place.id);
                        if(!exists) {
                            placesSet.add(place);
                        }
                    });
                }
            });

        return Promise.resolve(this.continentsMap);
    }

    addPlaceToTravels(place: Place) {
        this.travels.add(place);
        const continentPlacesList = this.continentsMap.get(place.continent);
        this.continentsMap.set(place.continent, continentPlacesList.add(place));

        this.storage.get('travelsLength')
            .then((value) => {
                let currentLength = value;
                currentLength = currentLength + 1;
                this.storage.set('travelsLength', currentLength);
                this.storage.set('travels', this.continentsMap);
            });
    }

    initializeContinentsContent() {
        const placesFromMock = PLACES_BEEN_MOCK;
    
        for(const continent of this.continents) {
          this.continentsMap.set(continent, new Set());
        }
    
        for(const p of placesFromMock) {
          const continentPlacesList = this.continentsMap.get(p.continent);
          this.continentsMap.set(p.continent, continentPlacesList.add(p));
        }

        for(const c of this.continentsMap) {
            for(const p of c[1]) {
                this.travels.add(p);
            }
        }

        this.storage.get('travelsLength').then((len) => {
            if(len <= this.travels.size) {
                this.storage.set('travelsLength', this.travels.size);
                this.storage.set('travels', this.continentsMap);
            }
        });
    }

    getPlacesFromContinent(continent: string): Place[] {
        return Array.from(this.continentsMap.get(continent));
    }
}
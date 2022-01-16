import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    // To set an item
    public set(key: string, value: any) {
        this._storage?.set(key, value);
    }

    // To get an item
    async get(key: string) {
        const name = await this.storage.get(key);
        return name;
    }

    // To remove an item
    async removeKey(key: string) {
        await this.storage.remove(key);
    }

    // To clear all items
    async removeAllKeys() {
        await this.storage.clear();
    }

    // To gel all keys
    async getAllKeysStored() {
        await this.storage.keys();
    }

    // To get the quantity of key/value
    async getStorageLength() {
        await this.storage.length();
    }

    // To enumerate the stored key/value pairs
    public getKeyValuePairs() {
        this.storage.forEach((key, value, index) => {});
    }

}
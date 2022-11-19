import { action, computed, makeObservable } from "mobx";
import { DataStore } from "./dataStore";
import { FilterStore } from "./filterStore";
import { ModalStore } from "./modalStore";

export class RootStore {
    filterStore: FilterStore;
    dataStore: DataStore;
    modalStore: ModalStore;

    constructor() {
        this.filterStore = new FilterStore(this);
        this.dataStore = new DataStore(this);
        this.modalStore = new ModalStore(this);
        makeObservable(this, {
            enableResetButton: computed,
            resetStores: action
        })
    }

    get enableResetButton(): boolean {
        if (this.dataStore.resetable || this.modalStore.resetable || this.filterStore.resetable) return true;
        return false;
    }

    public resetStores() {
        this.filterStore.resetStore();
        this.dataStore.resetStore();
        this.modalStore.resetStore();
        this.dataStore.reloadData();
    }
}
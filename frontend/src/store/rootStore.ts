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
    }
}
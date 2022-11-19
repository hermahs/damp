import { observable, action, makeObservable, runInAction, computed } from 'mobx';
import { RootStore } from './rootStore';

export interface IFilterData {
    type: string;
    data: number | string[] | number[] | (Date | null)[];
    visualData: string;
}

export interface IFilter {
    name: string;
    color: string;
    description: string;
    data?: IFilterData;
}

interface ReturnData {
    genre?: string[];
    price?: number[];
    releasedate?: (Date | null)[];
    achivements?: number;
    tags?: string[];
}

export class FilterStore {
    activeFilters: Set<IFilter> = new Set<IFilter>();
    allFilters: Set<IFilter> = new Set<IFilter>([
        {name: "Genre", color: "#F2994A", description: "The genre of the game"}, 
        {name: "Price", color: "#F2C94C", description: "The price of the game"}, 
        {name: 'ReleaseDate', color: '#BB6BD9', description: "The release date of the game"}, 
        {name: "Achievements", color: "#2D9CDB", description: "The number of achievements of the game"}, 
        {name: "Tags", color: "#EB5757", description: "The tags of the game"}]);
    queryFilter: ReturnData = observable.object<ReturnData>({});
    rootStore: RootStore;
    selectedFilter: IFilter | undefined;
    showModalInfo: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            activeFilters: observable,
            allFilters: observable,
            queryFilter: observable,
            addFilter: action,
            removeFilter: action,
            resetStore: action,
            resetable: computed
        });
    }

    get resetable(): boolean {
        if (Array.from(this.activeFilters).length > 0) return true;
        return false;
    }

    private addFilterQuery (filter: IFilter) {
        switch (filter.name) {
            case "Genre":
                this.queryFilter.genre = (filter.data!.data as string[]);
                break;
            case "Price":
                this.queryFilter.price = (filter.data!.data as number[]);
                break;
            case "ReleaseDate":
                this.queryFilter.releasedate = (filter.data!.data as (Date | null)[]);
                break;
            case "Achievements":
                this.queryFilter.achivements = (filter.data!.data as number);
                break;
            case "Tags":
                this.queryFilter.tags = (filter.data!.data as string[]);
                break;
        }
    }

    private removeFilterQuery (filter: IFilter) {
        type objectKey = keyof ReturnData;
        delete this.queryFilter[filter.name.toLowerCase() as objectKey];
    }

    private getFromSet(set: Set<IFilter>, name: string): IFilter {
        let elem: IFilter;
        for(let a of Array.from(set)) {
            if (a.name === name) {
                elem = a;
                break;
            }
        }
        set.delete(elem!);
        return elem!;
    }

    addFilter(filter: string, data: IFilterData) {
        const f = this.getFromSet(this.allFilters, filter);
        f.data = data;
        this.addFilterQuery(f);
        this.activeFilters.add(f);
        runInAction(() => {
            this.rootStore.dataStore.reloadData();
        });
    }

    removeFilter(filter: string) {
        const f = this.getFromSet(this.activeFilters, filter);
        this.removeFilterQuery(f);
        this.allFilters.add(f);
        runInAction(() => {
            this.rootStore.dataStore.reloadData();
        });
    }

    selectFilter(filter: IFilter) {
        this.selectedFilter = filter;
        this.showModalInfo = true;
    }

    unSelectFilter() {
        runInAction(() => {
            this.showModalInfo = false;
            this.selectedFilter = undefined;
        });
    }

    resetStore() {
        Array.from(this.activeFilters).forEach(filter => {
            const f = this.getFromSet(this.activeFilters, filter.name);
            this.removeFilterQuery(f);
            this.allFilters.add(f);
        });
    }
}
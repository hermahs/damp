import { action, IObservableArray, makeObservable, observable, runInAction } from "mobx";
import { Game, SortType } from "../types";
import { LOAD_GAMES } from "../graphQL";
import { client } from "../util";
import { ApolloError, ObservableQuery } from "@apollo/client";
import { RootStore } from "./rootStore";

interface ISort {
    ascending: boolean;
    type: SortType;
}

export class DataStore {
    data: IObservableArray<Game>;
    pageNumber: number;
    searchString: string = "";
    loading: boolean;
    allFound: boolean = false;
    error: ApolloError | undefined;
    sort: ISort;
    rootStore: RootStore
    query: ObservableQuery = client.watchQuery({query: LOAD_GAMES});

    constructor(rootStore: RootStore) {
        this.pageNumber = 0
        this.loading = false;
        this.error = undefined;
        this.data = observable.array<Game>([]);
        this.sort = {
            ascending: true,
            type: SortType.NONE
        };
        this.rootStore = rootStore;
        makeObservable(this, {
            data: observable,
            loading: observable,
            error: observable,
            allFound: observable,
            searchString: observable,
            getMoreData: action,
            reloadData: action,
            setSort: action,
            setSearchString: action
        });
        runInAction(() => {
            this.getMoreData();
        });
    }

    async reloadData() {
        runInAction(() => {
            this.pageNumber = 0;
            this.data.clear();
            this.allFound = false;
            this.getMoreData();
        });
    }

    setSearchString(s: string) {
        this.searchString = s;
    }

    async getMoreData() {
        const variables = {
            page: this.pageNumber,
            filter: this.rootStore.filterStore.queryFilter,
            sort: this.sort,
            search: this.searchString
        };
        this.error = undefined;
        this.loading = true;
        client.query({
            query: LOAD_GAMES,
            variables
        }).then(
            action("getSucces", ({data}) => {
                this.data.push(...data.games);
                this.loading = false;
                this.pageNumber++;
                if (data.games.length < 15) {
                    this.allFound = true;
                }
            })
        ).catch(action("getError", (error: ApolloError) => {
            console.log(error);
            this.error = error;
        }))
    }

    setSort(type: SortType, ascending: boolean = true) {
        this.sort.ascending = ascending;
        this.sort.type = type;
        this.reloadData();
    }

}
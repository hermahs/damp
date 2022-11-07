import { ObservableQuery } from "@apollo/client";
import { action, makeObservable, observable, runInAction } from "mobx";
import { GET_SINGLE_GAME } from "../graphQL";
import { Game } from "../types";
import { client } from "../util";
import { RootStore } from "./rootStore";

export class ModalStore {
    selectedGame: number = -1;
    game: Game | undefined;
    showModal: boolean = false;
    updating: boolean = false;
    rootStore: RootStore;
    q: ObservableQuery = client.watchQuery({
        query: GET_SINGLE_GAME
    });

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            game: observable,
            showModal: observable,
            updating: observable,
            selectGame: action,
            unSelectGame: action,
            updateGameData: action
        })
    }

    selectGame(appId: number) {
        this.q.refetch({
            appId: appId
        }).then(action("getSuccess", ({data}) => {
            this.game = data.game as Game;
            this.showModal = true;
            this.selectedGame = appId;
        }))
    }

    updateGameData() {
        this.updating = true;
        if (this.selectedGame === -1) return;
        this.q.refetch({
            appId: this.selectedGame
        }).then(action("getSuccess", ({ data }) => {
            this.game = data.game as Game;
            this.updating = false;
        }));
    }

    unSelectGame() {
        runInAction(() => {
            this.showModal = false;
            this.game = undefined;
            this.selectedGame = -1;
        })
    }

}
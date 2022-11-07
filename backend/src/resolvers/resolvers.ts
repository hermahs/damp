import { addComment } from "./Comment";
import { getGame, getGameBySearch, getGames } from "./Game";

export const resolvers = {
    Query: {
        games: getGames,
        gameSearch: getGameBySearch,
        game: getGame
    },
    Mutation: {
        addComment: addComment
    }
}
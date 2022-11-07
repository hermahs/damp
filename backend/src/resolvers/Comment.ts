import { Game } from "../models";

export async function addComment(_1: any, args: any) {
    await Game.updateOne({ appId: args.game }, {
        $push: {comments: args.comment}
    });
    return args.comment;
}
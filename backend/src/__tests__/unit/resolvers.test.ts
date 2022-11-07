import { getGame, getGameBySearch, getGames } from "../../resolvers/index";
import { IGame, typeDefs } from "../../types";
import resolvers from "../../resolvers/index"
import { Game } from "../../models";
import mongoose, { Document } from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import { mockData } from "../../data/data";

const connectDb = async (db: MongoMemoryServer) => {
    await mongoose.connect(db.getUri());
}

const disconnectFromDb = async () => {
    await mongoose.disconnect();
}

const addMockData = async () => {
    const l = mockData.map(d => ({...d, releaseDate: new Date(parseInt(d.releaseDate.$date.$numberLong)).toISOString()}));
    await Game.create(l);
}

const dropMockData = async () => {
    const collections = await mongoose.connection.db.collections();
    collections.forEach(col => {
        col.drop();
    });
}

describe("getGames", () => {
    let db;
    let foundGames: IGame[] = [];

    beforeAll(async () => {
        db = await MongoMemoryServer.create();
        await connectDb(db);
        await addMockData();
    });

    beforeEach(async () => {
        foundGames = [];
    })

    afterAll(async () => {
        await disconnectFromDb();
    });

    it("should get 15 games", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NONE',
                ascending: true
            }
        }

        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toEqual(15);
    });

    it("should first load 15 games, then load 15 more", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toEqual(15);
        args.page++;
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.length).toEqual(30);
    });

    it("should get filtered games by genre", async () => {
        const args = {
            page: 0,
            filter: {
                genre: ["Action"]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.genre).toContain("Action")
        });

        foundGames = [];
        args.filter.genre.push("Strategy");
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.genre).toContain("Action")
            expect(game.genre).toContain("Strategy")
        });
    });
    
    it("should get filtered games by price", async () => {
        const args = {
            page: 0,
            filter: {
                price: [0, 15]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.price).toBeLessThanOrEqual(15);
        });
    });

    it("should get filtered games by tags", async () => {
        const args = {
            page: 0,
            filter: {
                tags: ["Strategy"]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.popular_tags).toContain("Strategy")
        });
    });

    it("should get filtered games by releaseDate", async () => {
        const args = {
            page: 0,
            filter: {
                releasedate: [null, new Date(1513136810000)]
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames.map(a => a.name)).toContain("They Are Billions");
    });

    it("should get filtered games by achievements", async () => {
        const args = {
            page: 0,
            filter: {
                achivements: 1
            },
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        foundGames.push(...(await getGames({}, args, {}, {})));
        foundGames.forEach(game => {
            expect(game.achievements).toBeLessThan(1);
        });
    });

    it("should sort by name", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NONE',
                ascending: true
            }
        }
        
        const l = await getGames({}, args, {}, {});
        args.sort.type = "NAME";
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames).not.toEqual(l);
    });

    it("ascending and descending should not be the same", async () => {
        const args = {
            page: 0,
            sort: {
                type: 'NAME',
                ascending: true
            }
        }
        
        const l = await getGames({}, args, {}, {});
        args.sort.ascending = false;
        foundGames.push(...(await getGames({}, args, {}, {})));
        expect(foundGames).not.toEqual(l);
    });
});

import { render, screen, cleanup, getByAltText } from "@testing-library/react";
import { GameCards } from "../gamecard";
import { defaultContext, store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "mobx-react";
import { Game, Comment } from "../../types";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

const comment: Comment = {
  name: "the watcher",
  rating: 3,
  comment: "i recommend this game",
};

const game1: Game = {
  name: "Overcooked",
  appId: 379720,
  imagePath: "https://cdn.akamai.steamstatic.com/steam/apps/379720/header.jpg",
  release_date: "May 12, 1962",
  publisher: ["Gutta boys"],
  genre: ["Action"],
  all_reviews: "Very Positive,(3,547),- 84% of the 3,547 user reviews for this game are positive.",
  developer: "Johan",
  game_description: "Lets get cooking, awesome game",
  description: "",
  achievements: 59,
  languages: ["Hindu, Norwegian"],
  price: 42,
  releaseDate: new Date(),
  comments: [comment],
};

const game2: Game = {
  name: "Trackmania",
  appId: 379721,
  imagePath: "https://cdn.akamai.steamstatic.com/steam/apps/379720/header.jpg",
  release_date: "September 17, 1959",
  publisher: ["Kara fra Sahra"],
  genre: ["Strategy"],
  all_reviews: "7 user reviews,- Need more user reviews to generate a score",
  developer: "Han der",
  game_description: "Lets get speedy",
  description: "",
  achievements: 10,
  languages: ["Norsk"],
  price: 45,
  releaseDate: new Date(),
  comments: [],
};

const game3: Game = {
  name: "Elden Ring",
  appId: 379722,
  imagePath: "",
  release_date: "December 6, 1999",
  publisher: ["Børge"],
  genre: ["RPG"],
  all_reviews: "",
  developer: "Ludde",
  game_description: "Gotta find the Elden Ring",
  description: "",
  achievements: 0,
  languages: ["English"],
  price: 60,
  releaseDate: new Date(),
  comments: [],
};
store.dataStore.data.push(game1);
store.dataStore.data.push(game2);
store.dataStore.data.push(game3);

afterEach(cleanup);

describe("GameCards test", () => {
  it("renders without crashing, and shows correct games", () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}>
          <GameCards />
        </MockedProvider>
      </Provider>
    );

    screen.getByText(/overcooked/i);
    screen.getByText(/May 12, 1962/i);
    screen.getByText(/Action/i);
    screen.getByText(/84%/i);

    screen.getByText(/elden ring/i);
    screen.getByText(/trackmania/i);
  });


  it("game card modal test", () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}>
          <GameCards />
        </MockedProvider>
      </Provider>
    );

    userEvent.click(screen.getByText(/overcooked/i));
    //screen.getByText(/description/i);
  });  






























});
/*
describe("Filter snapshot test", () => {
  it("render filter component", () => {
    const tree = renderer
      .create(
        <Provider {...defaultContext}>
          <MockedProvider addTypename={false}>
            <GameCards />
          </MockedProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}); */

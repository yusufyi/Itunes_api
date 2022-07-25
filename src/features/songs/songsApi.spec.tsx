import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import SongsAPI from "./SongsApi";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <SongsAPI />
    </Provider>
  );

  expect(getByText(/Artist/i)).toBeInTheDocument();
});

import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import ResultItem from "../src/components/ResultItem";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Mock fetch globally with the "Movie not found!" response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers({ "Content-Type": "application/json" }),
    json: () =>
      Promise.resolve({
        Response: "False",
        Error: "Movie not found!",
      }),
  } as Response)
);

describe("ResultItem", () => {
  test("displays not found poster when movie is not found", async () => {
    render(
      <MemoryRouter initialEntries={["/movie/cheese"]}>
        <Routes>
          <Route path="/movie/:id" element={<ResultItem />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the component to finish loading
    await waitFor(() => {
      // Check for the not found poster
      const posterImage = screen.getByAltText("undefined Poster");
      expect(posterImage).toBeInTheDocument();
      expect(posterImage).toHaveAttribute("src", "../images/notfound.png");
    });
  });
});

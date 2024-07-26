import React from "react";
import App from "../src/App";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
const apiKey = process.env.VITE_REACT_APP_API_KEY;

describe("The app loads up properly", () => {

    jest.mock("../src/config/config", () => ({
        config: {
          apiKey: `${apiKey}`,
        },
      }));
    test("Search Bar loads properly", () => {
        render(<App />)
        expect(screen.getByText('Search App')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter movie title')).toBeInTheDocument();
        let button = expect(screen.getByRole('button'))
        button.toBeInTheDocument();
        button.toContainHTML('Search');
    })
})
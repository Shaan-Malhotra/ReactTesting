import { render, screen, waitFor } from '@testing-library/react';
import React from "react";
import SearchForm from "../src/components/SearchForm";
import fetchMock from 'jest-fetch-mock';

const mockMovieData = {
    Title: 'The Lion King',
    Plot: 'A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
    Released: '1994-06-24',
    Director: 'Roger Allers, Rob Minkoff',
    Poster: 'https://example.com/poster.jpg',
};

describe('SearchForm', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('fetches and displays movie data', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockMovieData));

        render(<SearchForm />);

        expect(screen.getByText(/loading.../i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(mockMovieData.Title)).toBeInTheDocument();
        });

        expect(screen.getByText(mockMovieData.Plot)).toBeInTheDocument();
        expect(screen.getByText(`Released: ${mockMovieData.Released}`)).toBeInTheDocument();
        expect(screen.getByText(`Director: ${mockMovieData.Director}`)).toBeInTheDocument();
        expect(screen.getByAltText(/movie poster/i)).toHaveAttribute('src', mockMovieData.Poster);
    });

});
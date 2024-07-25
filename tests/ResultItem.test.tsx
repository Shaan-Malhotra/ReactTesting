import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ResultItem from '../src/components/ResultItem';
import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn();

describe('ResultItem', () => {
    const mockMovieData = {
        Title: 'The Lion King',
        Plot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
        Released: '1994-06-24',
        Director: 'Roger Allers, Rob Minkoff',
        Poster: 'some_url_to_poster_image'
    };

    beforeEach(() => {
        // Mock the fetch function to return the mock data
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockMovieData,
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('fetches and displays movie data', async () => {
        const title = 'The Lion King';
        const year = '1994';

        render(<ResultItem title={title} year={year} />);

        // Wait for the component to update
        await waitFor(() => {
            // Ensure the movie title is displayed
            expect(screen.getByText('The Lion King')).toBeInTheDocument();

            // Ensure other movie details are displayed
            expect(screen.getByText('A lion prince, Simba, is born in Africa and thus making his uncle Scar the second in line to the throne.')).toBeInTheDocument();
            expect(screen.getByText('Released: 1994-06-24')).toBeInTheDocument();
            expect(screen.getByText('Director: Roger Allers, Rob Minkoff')).toBeInTheDocument();

            // Ensure the poster image is displayed
            const poster = screen.getByAltText('Movie Poster');
            expect(poster).toBeInTheDocument();
            expect(poster).toHaveAttribute('src', 'some_url_to_poster_image');
        });
    });

    test('handles fetch error gracefully', async () => {
        // Mock the fetch function to return an error
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({}),
        });

        const title = 'The Lion King';
        const year = '1994';

        render(<ResultItem title={title} year={year} />);

        // Wait for the component to handle the error
        await waitFor(() => {
            // You might want to check how the component handles errors. 
            // For example, you could check if the "Loading..." text is replaced with an error message if applicable.
            expect(screen.getByText('Loading...')).toBeInTheDocument();
        });
    });
});
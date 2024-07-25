import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from "react";
import SearchForm from "../src/components/SearchForm";
import fetchMock from 'jest-fetch-mock';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchForm', () => {
    const mockMovieData = {
        Title: 'The Lion King',
        Plot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
        Released: '1994-06-24',
        Director: 'Roger Allers, Rob Minkoff',
        Poster: 'some_url_to_poster_image'
    };

    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: mockMovieData });
    });

    test('searches and displays movie data', async () => {
        const mockOnSearch = jest.fn(); // Mock function

        render(<SearchForm onSearch={mockOnSearch} />);

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Enter movie title'), {
            target: { value: 'The Lion King' }
        });

        // Simulate button click
        fireEvent.click(screen.getByText('Search'));
        expect(mockOnSearch).toHaveBeenCalledWith('The Lion King');

        // await waitFor(() => {
        //     // Ensure the movie title is displayed
        //     expect(screen.findByText('The Lion King')).toBeInTheDocument();

        //     // Ensure other movie details are displayed
        //     expect(screen.findByText('Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.')).toBeInTheDocument();
        //     expect(screen.findByText('Released: 1994-06-24')).toBeInTheDocument();
        //     expect(screen.findByText('Director: Roger Allers, Rob Minkoff')).toBeInTheDocument();

        // Ensure the poster image is displayed
        // const poster = screen.getByAltText('Movie Poster');
        // expect(poster).toBeInTheDocument();
        // expect(poster).toHaveAttribute('src', 'some_url_to_poster_image');
    });
});


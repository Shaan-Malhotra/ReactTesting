import { render, screen, waitFor } from '@testing-library/react';
import React from "react";
import SearchForm from "../src/components/SearchForm";
import fetchMock from 'jest-fetch-mock';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockMovieData = {
    Title: 'The Lion King',
    Plot: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    Released: '1994-06-24',
    Director: 'Roger Allers, Rob Minkoff',
    Poster: 'https://example.com/poster.jpg',
};

describe('SearchForm', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: mockMovieData });
    });

    test('fetches and displays movie data', async () => {
        render(<SearchForm />);

        await waitFor(() => {
            expect(screen.getByText('Movie Information')).toBeInTheDocument();
            expect(screen.findByText('The Lion King')).toBeInTheDocument();
            expect(screen.findByText('Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.')).toBeInTheDocument();
            expect(screen.findByText('Released: 1994-06-24')).toBeInTheDocument();
            expect(screen.findByText('Director: Roger Allers, Rob Minkoff')).toBeInTheDocument();
        });
    });

});
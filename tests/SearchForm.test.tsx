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
        const mockOnSearch = jest.fn(); 

        render(<SearchForm onSearch={mockOnSearch} />);

        fireEvent.change(screen.getByPlaceholderText('Enter movie title'), {
            target: { value: 'The Lion King' }
        });

        fireEvent.click(screen.getByText('Search'));
        expect(mockOnSearch).toHaveBeenCalledWith('The Lion King');

    });

    test("form is not submitted when input is empty due to the required field", () => {
        const mockOnSearch = jest.fn();
        render(<SearchForm onSearch={() => {}} />);
        
        const submitButton = screen.getByText("Search");
    
        fireEvent.click(submitButton);

        expect(mockOnSearch).not.toHaveBeenCalled();
      });
});


import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import ResultList from '../src/components/ResultList';
import '@testing-library/jest-dom';
import { Movie } from '../src/types/movie';
import { MemoryRouter } from 'react-router-dom';

describe('Result List behaves properly', () => {
    const mockMovieData: Movie[] = [
        {
            imdbID: 'tt0110357',
            Type: 'movie',
            Title: 'The Lion King',
            Year: '1994-06-24',
            Poster: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg'
        },
        {
            imdbID: 'tt0363771',
            Type: 'movie',
            Title: 'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',
            Year: '2005-12-09',
            Poster: 'https://m.media-amazon.com/images/M/MV5BMTc0NTUwMTU5OV5BMl5BanBnXkFtZTcwNjAwNzQzMw@@._V1_SX300.jpg'
        },

    ];

    test('Renders the right amount of movies properly', async () => {
        const { container } = render(
            <MemoryRouter>
                <ResultList movies={mockMovieData} />
            </MemoryRouter>)

        await waitFor(() => {
            expect(container.getElementsByClassName('card').length).toEqual(2)
        })
    })
})
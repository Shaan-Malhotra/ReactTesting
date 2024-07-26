import { getByRole, render } from '@testing-library/react';
import React from "react";
import PosterImg from "../src/components/PosterImg";
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PosterImg', () => {
    const mockPosterUrl = "https://m.media-amazon.com/images/M/MV5BZWQ0OTQ3ODctMmE0MS00ODc2LTg0ZTEtZWIwNTUxOGExZTQ4XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg";
    
    test('renders poster image when sucessfully loaded', () => {
        const mockPosterImage = render(<PosterImg 
            url={mockPosterUrl} 
            children={undefined} 
            />);  
        const img = getByRole(mockPosterImage.container, 'img');
        expect(img).toHaveAttribute('src', mockPosterUrl);
    });
});

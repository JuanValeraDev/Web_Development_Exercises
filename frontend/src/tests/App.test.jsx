// frontend/src/tests/App.test.jsx
import {act, render, screen} from '@testing-library/react';
import axios from 'axios';
import {describe, it, expect, vi} from 'vitest';
import App from './../components/App';

// Mock de axios
vi.mock('axios');

describe('App component', () => {

    it('Show Loading when render App.jsx', async () => {
        // Mock de la respuesta de axios
        act(() => {
            axios.get.mockResolvedValueOnce({data: []});
        })

        render(<App/>);

        expect(screen.getByText('Loading...')).toBeInTheDocument();

    });
});

import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../components/App';
import React from 'react';

vi.mock('axios');

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

describe('App component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<App />);
    });

    it('shows "Loading..." when rendering App', () => {
        render(<App />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('calls fetchUsers on component mount', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });
        render(<App />);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    it('renders UsersGrid when users.length is greater than 0', async () => {
        const mockUsers: User[] = [{ id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', phone_number: '123-456-7890' }];
        axios.get.mockResolvedValueOnce({ data: mockUsers });
        render(<App />);
        await waitFor(() => expect(screen.getByTestId('users-grid')).toBeInTheDocument());
    });

    it('handles errors correctly', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        axios.get.mockRejectedValueOnce(new Error('Network Error'));
        render(<App />);
        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith(new Error('Network Error')));
    });
});

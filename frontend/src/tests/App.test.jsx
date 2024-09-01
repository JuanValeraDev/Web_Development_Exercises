import {render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import {describe, it, expect, vi} from 'vitest';
import App from './../components/App';
import {beforeEach} from 'vitest'


vi.mock('axios');


describe('App component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<App/>);
    });

    it('shows "Loading..." when rendering App', () => {
        render(<App/>);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('calls fetchUsers on component mount', async () => {
        axios.get.mockResolvedValueOnce({data: []});
        render(<App/>);
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    });

    it('renders UsersGrid when users.length is greater than 0', async () => {
        const mockUsers = [{id: 1, first_name: 'John', last_name: 'Doe'}];
        axios.get.mockResolvedValueOnce({data: mockUsers});
        render(<App/>);
        await waitFor(() => expect(screen.getByTestId('users-grid')).toBeInTheDocument());
    });

    it('handles errors correctly', async () => {
        const consoleSpy = vi.spyOn(console, 'log');
        axios.get.mockRejectedValueOnce(new Error('Network Error'));
        render(<App/>);
        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith(new Error('Network Error')));
    });
});


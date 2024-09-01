import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {UsersGrid} from '../components/UsersGrid';
import React from 'react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
}

describe('UsersGrid component', () => {
    const mockUsers: User[] = [
        {id: 1, first_name: 'John', last_name: 'Doe'},
        {id: 2, first_name: 'Jane', last_name: 'Doe'},
        {id: 3, first_name: 'Jim', last_name: 'Beam'},
        {id: 4, first_name: 'Jack', last_name: 'Daniels'},
        {id: 5, first_name: 'Carl', last_name: 'Doe'},
        {id: 6, first_name: 'Stephen', last_name: 'Doe'},
        {id: 7, first_name: 'Jeremy', last_name: 'Beam'},
        {id: 8, first_name: 'Nicolas', last_name: 'Daniels'},
    ];

    it('renders without crashing', () => {
        render(<UsersGrid users={[]} />);
    });

    it('displays the correct number of UserCard components', () => {
        render(<UsersGrid users={mockUsers} />);
        const userCards = screen.getAllByTestId('user-card');
        expect(userCards).toHaveLength(mockUsers.length);
    });

    it('passes user data correctly to each UserCard', () => {
        // @ts-ignore
        render(<UsersGrid users={mockUsers} />);
        mockUsers.forEach(user => {
            // @ts-ignore
            expect(screen.getByText(`${user.first_name} ${user.last_name}`)).toBeInTheDocument();
        });
    });

    it('displays UserCard components in rows of three columns', () => {
        render(<UsersGrid users={mockUsers} />);
        const userCards = screen.getAllByTestId('user-card');
        const rows = Math.ceil(userCards.length / 3);
        for (let i = 0; i < rows; i++) {
            const rowCards = userCards.slice(i * 3, i * 3 + 3);
            expect(rowCards).toHaveLength(Math.min(3, userCards.length - i * 3));
        }
    });
});

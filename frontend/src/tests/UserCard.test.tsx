import React from 'react';
import {render, screen} from '@testing-library/react';
import {describe, it, expect} from 'vitest';
import {UserCard} from '../components/UserCard';
import {User} from "../interfaces";

describe('UserCard component', () => {
    const mockUser: User = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone_number: '123-456-7890'
    };

    it('renders without crashing', () => {
        render(<UserCard user={mockUser}/>);
    });

    it('displays the user\'s name correctly', () => {
        render(<UserCard user={mockUser}/>);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('displays the user\'s email correctly', () => {
        render(<UserCard user={mockUser}/>);
        expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
    });

    it('displays the user\'s phone number correctly', () => {
        render(<UserCard user={mockUser}/>);
        expect(screen.getByText('Phone: 123-456-7890')).toBeInTheDocument();
    });

    it('displays the user\'s avatar correctly', () => {
        render(<UserCard user={mockUser}/>);
        const avatar = screen.getByAltText('John');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', 'https://robohash.org/1?set=set5');
    });
});

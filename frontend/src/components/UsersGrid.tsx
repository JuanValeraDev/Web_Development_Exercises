import React from "react";
import {Grid2} from "@mui/material";
import {UserCard} from "./UserCard";
import {UsersGridProps} from "../interfaces";

export const UsersGrid: React.FC<UsersGridProps> = ({users}) => {
    return (
        <Grid2 container spacing={3} sx={{
            backgroundColor: '#55679C',
            padding: '2em',
            borderRadius: '15px',
            margin: '1em',
        }}
               data-testid="users-grid"
        >
            {users.map(user => (
                <Grid2 size={4} key={user.id} component={'div'}>
                    <UserCard user={user}/>
                </Grid2>
            ))}
        </Grid2>
    );
};

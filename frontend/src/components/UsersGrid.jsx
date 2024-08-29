import {Grid2} from "@mui/material";
import {UserCard} from "./UserCard";
import React from "react";

export const UsersGrid = ({users}) => {
    return (
        <Grid2 container spacing={3} sx={
            {
                backgroundColor: '#55679C',
                padding: '2em',
                borderRadius: '15px',
                margin: '1em',
            }
        }>
            {users.map(user => (
                <Grid2 item size={4} key={user.id}>
                    <UserCard user={user}/>
                </Grid2>
            ))}
        </Grid2>
    );
};

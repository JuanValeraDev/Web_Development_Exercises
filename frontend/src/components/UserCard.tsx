import React from "react";
import {Avatar, Card, CardContent, Typography} from "@mui/material";
import {UserCardProps} from "../interfaces";

export const UserCard: React.FC<UserCardProps> = ({user}) => {
    return (
        <Card sx={{
            background: 'linear-gradient(180deg, #E1D7B7 0%, #7C93C3 1.5%, #55679C 100%)',
            display: 'flex',
            flexDirection: 'column',
            wordBreak: 'break-word',
            height: '100%',
            borderRadius: '20px',
            boxShadow: '0px 8px 6px #1E2A5E',
            border: '3px solid #E1D7B7'
        }}
              data-testid="user-card">
            <CardContent>
                <Avatar
                    src={`https://robohash.org/${user.id}?set=set5`}
                    alt={user.first_name}
                    sx={{
                        width: 100,
                        height: 100,
                        margin: '0 auto',
                        border: '3px solid #E1D7B7',
                        backgroundColor: '#55679C'
                    }}
                />
                <Typography variant="h6" fontFamily="Lato" fontWeight={"900"} align="center" gutterBottom
                            sx={{color: '#010725'}}>
                    {`${user.first_name} ${user.last_name}`}
                </Typography>
                <Typography variant="body2" align="center" fontFamily="Lato" fontWeight={"400"} sx={{color: '#E1D7B7'}}>
                    Email: {user.email}
                </Typography>
                <Typography variant="body2" align="center" fontFamily="Lato" fontWeight={"400"} sx={{color: '#E1D7B7'}}>
                    Phone: {user.phone_number}
                </Typography>
            </CardContent>
        </Card>
    );
};

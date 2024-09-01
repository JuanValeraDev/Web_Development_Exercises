import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffect, useState} from 'react'
import {Typography, Container} from '@mui/material';
import {UsersGrid} from "./UsersGrid";
import React from "react";


//TODO: Pasarlo a TypeScript
//TODO: Grabar live demo
//TODO: ¿Por qué no se ve el icono?

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

function App() {
    const API_URL = `https://random-data-api.com/api/v2/users?size=100`

    const [users, setUsers] = useState<User[]>([])
    const [totalUsers, setTotalUsers] = useState(0)

    const fetchUsers = async () => {
        axios.get<User[]>(API_URL)
            .then(function (response) {
                setUsers(prevUsers => [...prevUsers, ...response.data]);
                setTotalUsers(prevTotalUsers => prevTotalUsers + response.data.length);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchUsers()
    }, []);

    return (
        <Container
            maxWidth={false} sx={{
            paddingY: 4, backgroundColor: '#1E2A5E',
        }}>
            <InfiniteScroll
                dataLength={totalUsers}
                next={fetchUsers}
                hasMore={true}
                loader={<Typography>Loading...</Typography>}
            >
                {users.length > 0 && <UsersGrid users={users}/>}
            </InfiniteScroll>
        </Container>
    );
}

export default App;

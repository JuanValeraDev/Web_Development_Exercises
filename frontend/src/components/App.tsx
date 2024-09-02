import React, {useEffect, useState} from 'react'
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import {Typography, Container} from '@mui/material';
import {UsersGrid} from "./UsersGrid";
import {User} from "../interfaces"

function App() {
    const API_URL = `https://random-data-api.com/api/v2/users?size=100`

    const [users, setUsers] = useState<User[]>([])
    const [totalUsers, setTotalUsers] = useState(0)

    useEffect(() => {
        fetchUsers()
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get<User[]>(API_URL);
            setUsers(prevUsers => [...prevUsers, ...response.data]);
            setTotalUsers(prevTotalUsers => prevTotalUsers + response.data.length);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
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
        </>
    );
}

export default App;

import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
import {useEffect, useState} from 'react'
import {Typography, Container} from '@mui/material';
import {UsersGrid} from "./UsersGrid";

//TODO: Pasarlo a TypeScript
//TODO: Hacer tests
//TODO: Grabar live demo

function App() {
    const API_URL = `https://random-data-api.com/api/v2/users?size=100`

    const [users, setUsers] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)

    const fetchUsers = async () => {
        axios.get(API_URL)
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
                endMessage={
                    <Typography variant="body2" align="center">
                        No more users to show.
                    </Typography>
                }
            >
                {users.length > 0 && <UsersGrid users={users}/>}
            </InfiniteScroll>
        </Container>
    );
}

export default App;

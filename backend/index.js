import express from 'express';
import { findPokemonByName, getPokemonCsvByColor } from './handlers.js';

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//TODO: Hacer Tests


app.post('/pokemon/findByName', findPokemonByName);

app.get('/pokemon/csv/:color', getPokemonCsvByColor);


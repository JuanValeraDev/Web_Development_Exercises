import express from 'express';
import { findPokemonByName, getPokemonCsvByColor } from './handlers.js';

const app = express();
app.use(express.json());

const port = 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//TODO: Hacer Tests
//TODO: Ofuscar código para que no esté relacionado con la empresa y se pueda compartir en github


app.post('/pokemon/findByName', findPokemonByName);

app.get('/pokemon/csv/:color', getPokemonCsvByColor);


import express from 'express'
import axios from "axios";
import {createObjectCsvStringifier} from "csv-writer";


const app = express()
app.use(express.json())

const port = 3000

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

//TODO: Quitar espacios en el nombre del pokemon.
//TODO: Que el count de la respuesta del post devuelva el total de objetos recibidos

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// POST /pokemon/findByName
app.post('/pokemon/findByName', async (req, res) => {
    let {name} = req.body;
    name = name.trim().replace(/\s+/g, '');
    try {
        const response = await axios.get(`${POKEAPI_URL}/pokemon/${name.toLowerCase()}`);
        const data = response.data;
        const results = [{
            base_experience: data.base_experience,
            name: data.name,
            height: data.height,
            weight: data.weight
        }];
        res.json({
            count: results.length,
            results: results
        });
    } catch (error) {
        res.status(404).json({error: 'Pokemon not found'});
    }
});

// GET /pokemon/csv/:color
app.get('/pokemon/csv/:color', async (req, res) => {
    const {color} = req.params;
    try {
        const response = await axios.get(`${POKEAPI_URL}/pokemon-color/${color.toLowerCase()}`);
        const pokemons = response.data.pokemon_species;
        const pokemonNames = pokemons.map(pokemon => pokemon.name)

        let pokemonDetails = await Promise.all(pokemonNames.map(async (pokemon) => {
            try {
                const details = await axios.get(`${POKEAPI_URL}/pokemon/${pokemon}`);
                return {
                    name: details.data.name,
                    base_experience: details.data.base_experience,
                    height: details.data.height,
                    weight: details.data.weight
                };
            } catch (error) {
                console.error(`Error fetching details for ${pokemon}: ${error.message}`);
                return null;
            }
        }));
        pokemonDetails = pokemonDetails.filter(detail => detail !== null);

        pokemonDetails.sort((a, b) => b.base_experience - a.base_experience);

        const csvStringifier = createObjectCsvStringifier({
            header: [
                {id: 'name', title: 'name'},
                {id: 'base_experience', title: 'base_experience'},
                {id: 'height', title: 'height'},
                {id: 'weight', title: 'weight'}
            ]
        });

        const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(pokemonDetails);
        res.header('Content-Type', 'text/csv');
        res.attachment('pokemons.csv');
        res.send(csv);

    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

import axios from "axios";
import {createObjectCsvStringifier} from "csv-writer";

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

export const findPokemonByName = async (req, res) => {
    const {name} = req.body;
    const normalizedName = name.trim().replace(/\s+/g, '').toLowerCase();
    try {
        const response = await axios.get(`${POKEAPI_URL}/pokemon/${normalizedName}`);
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
        res.status(404).json({error: 'Pokémon not found'});
    }
};

export const getPokemonCsvByColor = async (req, res) => {
    const {color} = req.params;
    try {
        const response = await axios.get(`${POKEAPI_URL}/pokemon-color/${color.toLowerCase()}`);
        const pokemons = response.data.pokemon_species;
        const pokemonNames = pokemons.map(pokemon => pokemon.name);

        const pokemonDetails = await Promise.all(pokemonNames.map(async (pokemon) => {
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

        const filteredPokemonDetails = pokemonDetails.filter(detail => detail !== null);
        filteredPokemonDetails.sort((a, b) => b.base_experience - a.base_experience);

        const csvStringifier = createObjectCsvStringifier({
            header: [
                {id: 'name', title: 'name'},
                {id: 'base_experience', title: 'base_experience'},
                {id: 'height', title: 'height'},
                {id: 'weight', title: 'weight'}
            ]
        });

        const csv = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(filteredPokemonDetails);
        res.header('Content-Type', 'text/csv');
        res.attachment('pokemons.csv');
        res.send(csv);

    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

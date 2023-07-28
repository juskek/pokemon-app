import { pokemonDataJsonParser } from "./pokemonDataJsonParser";
import { IPokemonRepository } from "./IPokemonRepository";

export class PokemonRepository implements IPokemonRepository {
    async getPokemonPaginated({ pageParam = 0 }): Promise<PokemonUrlQueryData> {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${pageParam}&limit=20`,
        );
        return await pokemonDataJsonParser(response);
    }

    async getPokemonDetails(uri: string): Promise<PokemonStats> {
        const response = await fetch(uri);
        return (await response.json()) as PokemonStats;
    }
}

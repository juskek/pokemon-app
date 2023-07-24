import { useQuery } from "@tanstack/react-query";
import { IPokemonRepository } from "../../data/pokemon/IPokemonRepository";

export const usePokemonDetailsScreen = (pokemonUri: string) => {
    const { data, isLoading } = useQuery<PokemonStats>(
        ["useQueryPokemonDetailsScreen"],
        async () =>
            await IPokemonRepository.instance.getPokemonDetails(pokemonUri),
    );
    return {
        data,
        isLoading,
    };
};

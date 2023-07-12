import { useQuery } from "@tanstack/react-query";

export const usePokemonDetailsScreen = (pokemonUri: string) => {
    const fetchDetails = async () => {
        const response = await fetch(pokemonUri);
        return await response.json();
    };
    const { data, isLoading } = useQuery<PokemonStats>(
        ["useQueryPokemonDetailsScreen"],
        fetchDetails,
    );
    return {
        data,
        isLoading,
    };
};

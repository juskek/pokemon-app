import { useInfiniteQuery } from "@tanstack/react-query";
import { pokemonDataJsonParser } from "./pokemonDataJsonParser";
import queryString from "query-string";

export const usePokedexScreen = () => {
    const fetchProjects = async ({ pageParam = 0 }) => {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${pageParam}&limit=20`,
        );
        return pokemonDataJsonParser(res);
    };

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useInfiniteQuery<PokemonUrlQueryData, string>({
            queryKey: ["results"],
            queryFn: fetchProjects,
            getNextPageParam: (lastPage, pages) => {
                const uri = lastPage.next;
                const parsedParams = queryString.parseUrl(uri).query;
                const offset = parsedParams.offset;
                return offset;
            },
        });
    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
};

import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { IPokemonRepository } from "../../data/pokemon/IPokemonRepository";

export const usePokedexScreen = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
        useInfiniteQuery<PokemonUrlQueryData, string>({
            queryKey: ["results"],
            queryFn: IPokemonRepository.instance.getPokemonPaginated,
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

export const pokemonDataJsonParser = async (response: Response) => {
    try {
        return (await response.json()) as PokemonUrlQueryData;
    } catch (e: unknown) {
        throw new Error(`Error parsing JSON: ${e}`);
    }
};

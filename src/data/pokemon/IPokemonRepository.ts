import { PokemonRepository } from "./PokemonRepository";

export abstract class IPokemonRepository {
    private static _instance: IPokemonRepository | null = null;
    static get instance(): IPokemonRepository {
        if (!this._instance) {
            this._instance = new PokemonRepository();
        }
        return this._instance;
    }

    abstract getPokemonPaginated({
        pageParam = 0,
    }): Promise<PokemonUrlQueryData>;

    abstract getPokemonDetails(uri: string): Promise<PokemonStats>;
}

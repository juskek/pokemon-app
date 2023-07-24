import { PokemonRepository } from "./PokemonRepository";
import { TestPokemonRepository } from "./TestPokemonRepository";

export abstract class IPokemonRepository {
    private static _instance: IPokemonRepository | null = null;
    static get instance(): IPokemonRepository {
        if (!this._instance) {
            switch (process.env.NODE_ENV) {
                case "development":
                    this._instance = new PokemonRepository();
                    break;
                case "production":
                    this._instance = new PokemonRepository();
                    break;
                case "test":
                    this._instance = new TestPokemonRepository();
                    break;
                default:
                    throw new Error(
                        `Unknown environment: ${process.env.NODE_ENV}`,
                    );
            }
        }
        return this._instance;
    }

    abstract getPokemonPaginated({
        pageParam = 0,
    }): Promise<PokemonUrlQueryData>;

    abstract getPokemonDetails(uri: string): Promise<PokemonStats>;
}

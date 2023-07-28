import { pokemonDataJsonParser } from "./pokemonDataJsonParser";

describe("pokemonDataJsonParser", () => {
    it("should parse JSON response correctly", async () => {
        const jsonData =
            '{"count":1281,"next":"https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20","previous":null,"results":[{"name":"bulbasaur","url":"https://pokeapi.co/api/v2/pokemon/1/"},{"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"}]}';

        const mockResponse = {
            json: jest.fn().mockResolvedValue(JSON.parse(jsonData)),
        };

        const parsedData = await pokemonDataJsonParser(mockResponse as any);

        expect(parsedData).toEqual({
            count: 1281,
            next: "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
            previous: null,
            results: [
                {
                    name: "bulbasaur",
                    url: "https://pokeapi.co/api/v2/pokemon/1/",
                },
                {
                    name: "ivysaur",
                    url: "https://pokeapi.co/api/v2/pokemon/2/",
                },
            ],
        });
    });

    it("should throw an error if JSON parsing fails", async () => {
        const mockResponse = {
            json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
        };

        await expect(
            pokemonDataJsonParser(mockResponse as any),
        ).rejects.toThrowError("Error parsing JSON");
    });
});

import { renderHook } from "@testing-library/react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import queryString from "query-string";
import { usePokedexScreen } from "./usePokedexScreen";

jest.mock("@tanstack/react-query");
jest.mock("query-string");

describe("usePokedexScreen", () => {
    it("should return the correct data", async () => {
        const mockData = {
            pages: [
                {
                    results: [
                        {
                            name: "pokemon1",
                            url: "https://pokeapi.co/api/v2/pokemon/1/",
                        },
                        {
                            name: "pokemon2",
                            url: "https://pokeapi.co/api/v2/pokemon/2/",
                        },
                    ],
                    next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
                },
                {
                    results: [
                        {
                            name: "pokemon3",
                            url: "https://pokeapi.co/api/v2/pokemon/3/",
                        },
                        {
                            name: "pokemon4",
                            url: "https://pokeapi.co/api/v2/pokemon/4/",
                        },
                    ],
                    next: null,
                },
            ],
            pageParams: [null, "20"],
        };

        (useInfiniteQuery as jest.Mock).mockReturnValue({
            data: mockData,
            fetchNextPage: jest.fn(),
            hasNextPage: true,
            isFetchingNextPage: false,
            status: "success",
        });

        (queryString.parseUrl as jest.Mock).mockReturnValue({
            query: { offset: "20", limit: "20" },
        });

        const { result } = renderHook(() => usePokedexScreen());

        expect(result.current.data).toEqual(mockData);
        expect(result.current.hasNextPage).toBe(true);
        expect(result.current.isFetchingNextPage).toBe(false);
        expect(result.current.status).toBe("success");
    });
});

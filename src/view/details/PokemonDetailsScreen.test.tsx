import React from "react";
import { render } from "@testing-library/react-native";

import { PokemonDetailsScreen } from "./PokemonDetailsScreen";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IPokemonRepository } from "../../data/pokemon/IPokemonRepository";

describe("PokemonDetailsScreen", () => {
    it("should render the height, weight, and abilities of a pokemon", async () => {
        const mockData = await IPokemonRepository.instance.getPokemonDetails(
            "mock-uri",
        );

        const route: RouteProp<RootStackParamList, "PokemonDetailsScreen"> = {
            key: "mock-key",
            name: "PokemonDetailsScreen",
            params: { name: "mock-name", uri: "mock-uri" },
        };
        const navigation: NativeStackNavigationProp<
            RootStackParamList,
            "PokemonDetailsScreen"
        > = {
            navigate: jest.fn(),
            goBack: jest.fn(),
            dispatch: jest.fn(),
            canGoBack: jest.fn(),
            reset: jest.fn(),
            setParams: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            setOptions: jest.fn(),
            isFocused: jest.fn(),
            getId: jest.fn(),
            getState: jest.fn(),
            getParent: jest.fn(),
            replace: jest.fn(),
            push: jest.fn(),
            pop: jest.fn(),
            popToTop: jest.fn(),
        };

        const queryClient = new QueryClient();

        const { queryByText } = render(
            <QueryClientProvider client={queryClient}>
                <PokemonDetailsScreen route={route} navigation={navigation} />,
            </QueryClientProvider>,
        );

        expect(queryByText(`Height: ${mockData.height}`)).toBeDefined();
        expect(queryByText(`Weight: ${mockData.weight}`)).toBeDefined();
        expect(
            queryByText(
                `Abilities: ${mockData.abilities
                    .map((ability) => ability.ability.name)
                    .join(", ")}`,
            ),
        ).toBeDefined();
    });
});

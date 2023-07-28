import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokedexScreen } from "../view/pokedex/PokedexScreen";
import { PokemonDetailsScreen } from "../view/details/PokemonDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="PokedexScreen"
                    component={PokedexScreen}
                    options={{ title: "Pokedex" }}
                />
                <Stack.Screen
                    name="PokemonDetailsScreen"
                    component={PokemonDetailsScreen}
                    options={({ route }) => ({ title: route.params.name })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

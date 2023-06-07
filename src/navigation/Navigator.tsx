import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pokedex } from '../components/pokedex/Pokedex';
import { PokemonDetails } from '../components/details/PokemonDetails';

const Stack = createNativeStackNavigator();

<Stack.Screen name="Pokedex" component={Pokedex} />

export function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={Pokedex} />
        <Stack.Screen name="Pokemon Details" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pokedex from '../components/Pokedex';

const Stack = createNativeStackNavigator();

<Stack.Screen name="Pokedex" component={Pokedex} />

export default function Navigator()  {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pokedex" component={Pokedex} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

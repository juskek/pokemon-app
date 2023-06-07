import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text} from 'react-native';


export function PokemonDetails({ route }: { route: any, navigation: any }) {
    const { name, uri } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <Text>Pokemon Details</Text>
            <Text>{name}</Text>
            <Text>{uri}</Text>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


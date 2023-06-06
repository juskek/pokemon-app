import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { FlatList } from 'react-native';


const pokemonList = require("../../assets/kanto.json");

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export default function Pokedex({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>

            <FlatList
                data={pokemonList}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        style={styles.touchable}
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => navigation.navigate('PokemonDetails',
                            {
                                name: item.name,
                                uri: item.url,
                            }
                        )}>
                        <Item title={item.name} />
                    </TouchableHighlight>

                }
                keyExtractor={item => item.id}
            />

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 20,
    },
    touchable: {
        backgroundColor: '#f9c2ff',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },

});


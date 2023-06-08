import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';



export function PokemonDetails({ route }: { route: any, navigation: any }) {
    const { name, uri } = route.params;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<PokemonStats | null>(null);

    const fetchDetails = async () => {
        try {
            const response = await fetch(uri)
            const result = await response.json();

            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchDetails().then(() => {
            setIsLoading(false);
        });
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Text>Pokemon Details</Text>
            <Text>{name}</Text>
            <Text>{uri}</Text>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                !data ? (
                    <Text>No data</Text>
                ) : (
                    <View>
                        <Text>Height: {data.height}</Text>
                        <Text>Weight: {data.weight}</Text>
                        <Text>Abilities: {data.abilities.map((ability) => ability.ability.name).join(', ')}</Text>
                        <Text>Moves: {data.moves.map((move) => move.move.name).join(', ')}</Text>
                    </View>
                )
            )}
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


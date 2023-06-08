import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

type PokemonDetailsScreenRouteProps = {
    params: {
        name: string;
        uri: string;
    }
}

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetailsScreen'>;

export function PokemonDetailsScreen({ route }: Props) {
    const { name, uri } = route.params;


    const fetchDetails = async () => {
        const response = await fetch(uri)
        return await response.json();
    }
    const { data, isLoading, error } = useQuery<PokemonStats>(['useQueryPokemonDetailsScreen'], fetchDetails);



    return (
        <SafeAreaView style={styles.container}>
            <Text>Pokemon Details</Text>
            <Text>{name}</Text>
            <Text>{uri}</Text>
            {isLoading && <ActivityIndicator />}

            {!isLoading && !data && <Text>No data</Text>}

            {!isLoading && data && (
                <View>
                    <Text>Height: {data.height}</Text>
                    <Text>Weight: {data.weight}</Text>
                    <Text>Abilities: {data.abilities.map((ability) => ability.ability.name).join(', ')}</Text>
                    <Text>Moves: {data.moves.map((move) => move.move.name).join(', ')}</Text>
                </View>
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


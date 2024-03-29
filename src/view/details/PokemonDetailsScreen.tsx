import { StatusBar } from "expo-status-bar";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { usePokemonDetailsScreen } from "./usePokemonDetailsScreen";

type Props = NativeStackScreenProps<RootStackParamList, "PokemonDetailsScreen">;

export function PokemonDetailsScreen({ route }: Props) {
    const { uri } = route.params;

    const { data, isLoading } = usePokemonDetailsScreen(uri);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading && <ActivityIndicator />}

            {!isLoading && !data && <Text>No data</Text>}

            {!isLoading && data && (
                <View style={styles.card}>
                    <Text>Height: {data.height}</Text>
                    <Text>Weight: {data.weight}</Text>
                    <Text>
                        Abilities:{" "}
                        {data.abilities
                            .map((ability) => ability.ability.name)
                            .join(", ")}
                    </Text>
                </View>
            )}

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9c2ff",
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
    },
});
